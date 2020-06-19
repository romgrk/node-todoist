/*
 * index.js
 */

const got = require('got')
const uuid = require('uuid')
const stringify = JSON.stringify

const BASE = 'https://api.todoist.com/sync/v8'
const ENDPOINT = `${BASE}/sync`

const ARRAY_KEYS = [
  'collaborators',
  'collaborator_states',
  'due_exceptions',
  'filters',
  'items',
  'labels',
  'live_notifications',
  'notes',
  'project_notes',
  'projects',
  'reminders',
  'sections',
]

const COLORS_BY_ID = {
  30: '#b8256f',
  31: '#db4035',
  32: '#ff9933',
  33: '#fad000',
  34: '#afb83b',
  35: '#7ecc49',
  36: '#299438',
  37: '#6accbc',
  38: '#158fad',
  39: '#14aaf5',
  40: '#96c3eb',
  41: '#4073ff',
  42: '#884dff',
  43: '#af38eb',
  44: '#eb96eb',
  45: '#e05194',
  46: '#ff8d85',
  47: '#808080',
  48: '#b8b8b8',
  49: '#ccac93',
}

module.exports = Todoist

const defaultOptions = {
  resourceTypes: ['all'],
  autocommit: false
}

/**
 * @typedef {Object} Action
 * @property {string} name - The name of the command
 * @property {boolean} name - The name of the command
 */

/**
 * Create a Todoist API instance
 * @param {string} token The Todoist API key
 * @param {Object} [options] options
 * @param {Boolean} [options.autocommit=false] if set, all transactions will
 *                  be committed and synced directly
 * @returns {Object} an API instance
 */
function Todoist(token, userOptions = defaultOptions) {
  if (!/^[0-9A-Fa-f]{40}$/.test(token))
      throw new Error(`Invalid API token. A token should be 40 characters long and exist of hexadecimals, was ${token} (${token.length} characters)`);

  const options = Object.assign({}, defaultOptions, userOptions)
  const client = got.extend({ method: 'POST', responseType: 'json' })

  let syncToken = '*'
  let state = {
    collaborator_states: undefined,
    collaborators: undefined,
    day_orders_timestamp: undefined,
    day_orders: undefined,
    due_exceptions: undefined,
    filters: undefined,
    incomplete_item_ids: undefined,
    incomplete_project_ids: undefined,
    items: undefined,
    labels: undefined,
    live_notifications_last_read_id: undefined,
    live_notifications: undefined,
    locations: undefined,
    notes: undefined,
    project_notes: undefined, // XXX handle this
    projects: undefined,
    reminders: undefined,
    sections: undefined,
    stats: undefined,
    temp_id_mapping: undefined,
    tooltips: undefined,
    user_settings: undefined,
    user: undefined,
  }

  function updateState(patch) {
    syncToken = patch.sync_token

    /* Case 1: full_sync: replace whole state */
    if (patch.full_sync) {
      Object.assign(state, patch)
      return
    }

    /* Case 2: need to replace part of the state that changed */
    for (let key of ARRAY_KEYS) {
      const items = state[key]
      const newItems = patch[key]
      if (newItems.length === 0)
        continue
      state[key] =
        items.filter(i => !newItems.some(ni => ni.id === i.id))
              .concat(newItems.filter(i => !i.is_deleted))
    }
  }


  function request(url, data = {}) {
    let realUrl = typeof url === 'object' ? url.url : url
    let options = typeof url === 'object' ?
      { searchParams: url.query, form: { token, ...data } } :
      { form: { token, ...data } }
    return client(realUrl, options).then(res => res.body)
  }

  /**
   * @param {string} type - The type of resource
   * @param {string|Action} action - The name of the action
   * @param {Object} args - The arguments of the command
   * @returns {Promise}
   */
  function command(type, action, args) {
    const id = uuid.v4()
    const tempId = uuid.v4()

    const command = {
      type: action.name || `${type}_${action}`,
      args,
      uuid: id,
      temp_id: tempId
    }

    const data = {
      sync_token: syncToken,
      resource_types: stringify(options.resourceTypes),
      commands: stringify([command]),
    }

    const isAdd    = action.isAdd || action === 'add'
    const isDelete = action.isDelete || action === 'delete'

    return request(ENDPOINT, data)
    .then(res => {
      const ok = res.sync_status[id] === 'ok'

      if (!ok) {
        const status = res.sync_status[id]
        const error = new Error(`${status.error_tag}: ${status.error}`)
        return Promise.reject(error)
      }

      const newId = res.temp_id_mapping[tempId]

      updateState(res)

      return state[type + 's'].find(i => i.id === newId)
    })
  }

  function sync(resourceTypes = options.resourceTypes) {
    return request(ENDPOINT, { sync_token: syncToken, resource_types: stringify(resourceTypes) })
    .then(res => {
      updateState(res)
    })
  }

  function commit() {
    // TODO: implement
  }

  // API

  const projects = {
    get:     () => state.projects,
    add:     (options) => command('project', 'add', options),
    update:  (options) => command('project', 'update', options),
    move:    (options) => command('project', 'move', options),
    delete:  (options) => command('project', 'delete', options),
    archive:  (options) => command('project', 'archive', options),
    unarchive:  (options) => command('project', 'unarchive', options),
    reorder: (options) => command('project', 'reorder', options),
  }

  const items = {
    get:     () => state.items,
    getAll:  () => request(`${BASE}/completed/get_all`),
    add:     (options) => command('item', 'add', options),
    update:  (options) => command('item', 'update', options),
    move:    (options) => command('item', 'move', options),
    reorder: (options) => command('item', 'reorder', options),
    delete:  (options) => command('item', 'delete', options),
    close:   (options) => command('item', 'close', options),
    complete:  (options) => command('item', 'complete', options),
    uncomplete: (options) => command('item', 'uncomplete', options),
    archive:    (options) => command('item', 'archive', options),
    unarchive:  (options) => command('item', 'unarchive', options),
    updateDayOrders: (options) => command('item', 'update_day_orders', options),
    updateDateCompleted: (options) => command('item', 'update_date_complete', options),
  }

  const labels = {
    get:     () => state.labels,
    add:     (options) => command('label', 'add', options),
    update:  (options) => command('label', 'update', options),
    delete:  (options) => command('label', 'delete', options),
    updateOrders: (options) => command('label', 'update_orders', options),
  }

  const notes = {
    get:     () => state.notes,
    add:     (options) => command('note', 'add', options),
    update:  (options) => command('note', 'update', options),
    delete:  (options) => command('note', 'delete', options),
  }

  const sections = {
    get:     () => state.sections,
    add:     (options) => command('section', 'add', options),
    update:  (options) => command('section', 'update', options),
    move:    (options) => command('section', 'move', options),
    reorder: (options) => command('section', 'reorder', options),
    delete:  (options) => command('section', 'delete', options),
    archive:  (options) => command('section', 'archive', options),
    unarchive:  (options) => command('section', 'unarchive', options),
  }

  const filters = {
    get:     () => state.filters,
    add:     (options) => command('filter', 'add', options),
    update:  (options) => command('filter', 'update', options),
    delete:  (options) => command('filter', 'delete', options),
    updateOrders: (options) => command('filter', 'update_orders', options),
  }

  const reminders = {
    get:     () => state.reminders,
    add:     (options) => command('reminder', 'add', options),
    update:  (options) => command('reminder', 'update', options),
    delete:  (options) => command('reminder', 'delete', options),
    clearLocations: (options) => command('reminder', 'clear_locations', options),
  }

  const user = {
    get:     () => state.user,
    update:  (options) => command('user', 'update', options),
    updateGoals:  (options) => command('user', { name: 'update_goals' }, options),
  }

  const settings = {
    get:     () => state.user_settings,
    update:  (options) => command('user_settings', 'update', options),
  }

  const sharing = {
    collaborators: () => state.collaborators,
    shareProject: (options) => command('collaborator', { name: 'share_project' }, options),
    deleteCollaborator: (options) => command('collaborator', { name: 'delete_collaborator', isDelete: true }, options),
    acceptInvitation: (options) => command('collaborator', { name: 'accept_invitation' }, options),
    rejectInvitation: (options) => command('collaborator', { name: 'reject_invitation' }, options),
    deleteInvitation: (options) => command('collaborator', { name: 'delete_invitation' }, options),
  }

  const liveNotifications = {
    setLastRead: (options) => command('live_notifications', 'set_last_read', options),
    markAsRead: (options) => command('live_notifications', 'mark_read', options),
    markAllAsRead: (options) => command('live_notifications', 'mark_read_all', options),
    markAsUnread: (options) => command('live_notifications', 'mark_unread', options),
  }

  const business = {
    // TODO: implement
  }

  const activityLog = {
    get: (options) => request({ url: `${BASE}/activity/get`, query: options }),
  }

  const backup = {
    // TODO: implement
  }

  const email = {
    // TODO: implement
  }

  const api = {
    sync,
    commit,
    state,
    projects,
    items,
    labels,
    notes,
    sections,
    filters,
    reminders,
    user,
    settings,
    sharing,
    liveNotifications,
    business,
    activityLog,
    backup,
    email,
    colorsById: COLORS_BY_ID,
  }

  return api
}
