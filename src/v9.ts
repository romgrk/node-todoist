/*
 * index.js
 */

import got from 'got'
import { v4 as uuid } from 'uuid'
import * as Types from './v9-types'

export interface State {
  collaborator_states: Types.NodeType[]
  collaborators: Types.Collaborator[]
  day_orders_timestamp: string // example: '1591810376.59'
  day_orders: Types.NodeType[]
  due_exceptions: Types.NodeType[]
  filters: Types.Filter[]
  incomplete_item_ids: Types.NodeType[]
  incomplete_project_ids: Types.NodeType[]
  items: Types.Item[]
  labels: Types.Label[]
  live_notifications_last_read_id: number
  live_notifications: Types.LiveNotifications[]
  locations: Types.NodeType[]
  notes: Types.Note[]
  project_notes: Types.ProjectNote[]
  projects: Types.Project[]
  reminders: Types.Reminder[]
  sections: Types.Section[]
  stats: Types.NodeType[]
  tooltips: Types.NodeType[]
  user_settings: Types.UserSettings | null
  user: Types.User | null
  temp_id_mapping: Record<string, number>
}

interface TodoistResources {
  collaborator: Types.Collaborator[]
  filter: Types.Filter[]
  item: Types.Item[]
  label: Types.Label[]
  live_notifications: Types.LiveNotifications[]
  note: Types.Note[]
  project: Types.Project[]
  project_note: Types.ProjectNote[]
  reminder: Types.Reminder[]
  section: Types.Section[]
  user: Types.User
  user_settings: Types.User
}

type TodoistResponse = {
  sync_status: Record<string, string & { error_tag: string; error: string }>
  temp_id_mapping: Record<string, string>
  sync_token: string
  full_sync: boolean
} & State

const { stringify } = JSON

const BASE = 'https://api.todoist.com/sync/v9'

const COLORS_BY_ID: Record<Types.ColorId, string> = {
  'berry_red': '#b8256f',
  'red': '#db4035',
  'orange': '#ff9933',
  'yellow': '#fad000',
  'olive_green': '#afb83b',
  'lime_green': '#7ecc49',
  'green': '#299438',
  'mint_green': '#6accbc',
  'teal': '#158fad',
  'sky_blue': '#14aaf5',
  'light_blue': '#96c3eb',
  'blue': '#4073ff',
  'grape': '#884dff',
  'violet': '#af38eb',
  'lavender': '#eb96eb',
  'magenta': '#e05194',
  'salmon': '#ff8d85',
  'charcoal': '#808080',
  'grey': '#b8b8b8',
  'taupe': '#ccac93',
}

export type UpdateableProperties =
  | 'collaborators'
  | 'collaborator_states'
  | 'due_exceptions'
  | 'filters'
  | 'items'
  | 'labels'
  | 'live_notifications'
  | 'notes'
  | 'project_notes'
  | 'projects'
  | 'reminders'
  | 'sections'

const ARRAY_KEYS: UpdateableProperties[] = [
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

const defaultOptions = {
  endpoint: BASE,
  resourceTypes: ['all'],
  autocommit: false,
}
export type TodoistOptions = typeof defaultOptions

/**
 * Create a Todoist API instance
 */
export const Todoist = (token: string, userOptions = defaultOptions) => {
  if (!/^[0-9A-Fa-f]{40}$/.test(token))
    throw new Error(
      `Invalid API token. A token should be 40 characters long and exist of hexadecimals, was ${token} (${token.length} characters)`
    )

  const options = Object.assign({}, defaultOptions, userOptions)
  const client = got.extend({ method: 'POST', responseType: 'json' })

  const endpoint = `${options.endpoint}/sync`

  let syncToken = '*'
  let state: State = {
    collaborator_states: [],
    collaborators: [],
    day_orders_timestamp: '',
    day_orders: [],
    due_exceptions: [],
    filters: [],
    incomplete_item_ids: [],
    incomplete_project_ids: [],
    items: [],
    labels: [],
    live_notifications_last_read_id: 0,
    live_notifications: [],
    locations: [],
    notes: [],
    project_notes: [], // XXX handle this
    projects: [],
    reminders: [],
    sections: [],
    stats: [],
    temp_id_mapping: {},
    tooltips: [],
    user_settings: null,
    user: null,
  }

  const updateState = (patch: TodoistResponse) => {
    syncToken = patch.sync_token

    /* Case 1: full_sync: replace whole state */
    if (patch.full_sync) {
      Object.assign(state, patch)
      return
    }

    const updateItem = <Key extends UpdateableProperties>(key: Key) => {
      const items = state[key]
      const newItems: Types.NodeType[] = patch[key]
      const newItemIds = newItems.map((item) => item.id)
      const updatedItems = items
        // remove items that are not found in the result set
        .filter((item) => !newItemIds.includes(item.id))
        // add items from the result set
        .concat(newItems.filter((item) => !item.is_deleted))
      state[key] = updatedItems as State[Key]
    }

    /* Case 2: need to replace part of the state that changed */
    ARRAY_KEYS.forEach(updateItem)
  }

  const request = async (url: { url: string; query?: URLSearchParams }, data: Record<string, string> = {}) => {
    let realUrl = typeof url === 'object' ? url.url : url
    let options =
      typeof url === 'object' ? { searchParams: url.query, form: { token, ...data } } : { form: { token, ...data } }
    const res = await client<TodoistResponse>(realUrl, options)
    return res.body
  }

  /**
   * @param {string} type - The type of resource
   * @param {string|Action} action - The name of the action
   * @param {Object} args - The arguments of the command
   * @returns {Promise}
   */
  const executeCommand = async (type: keyof TodoistResources, action: string, args: {} = {}) => {
    const id = uuid()
    const tempId = uuid()

    const command = {
      type: `${type}_${action}`,
      args,
      uuid: id,
      temp_id: tempId,
    }

    const data = {
      sync_token: syncToken,
      resource_types: stringify(options.resourceTypes),
      commands: stringify([command]),
    }

    const res = await request({ url: endpoint }, data)
    const ok = res.sync_status[id] === 'ok'

    if (!ok) {
      const status = res.sync_status[id]
      const error = new Error(`${status.error_tag}: ${status.error}`)
      return Promise.reject(error)
    }

    const newId = res.temp_id_mapping[tempId]

    updateState(res)
    const stateKey = `${type}s` as Exclude<
      keyof State,
      'temp_id_mapping' | 'user' | 'user_settings' | 'live_notifications_last_read_id' | 'day_orders_timestamp'
    >
    return state[stateKey].find((item) => item.id === newId)
  }
  const createCommand =
    <Args>(type: keyof TodoistResources, action: string) =>
    async (args: Args) =>
      executeCommand(type, action, args)

  const sync = async (resourceTypes = options.resourceTypes) => {
    const res = await request(
      { url: endpoint },
      {
        sync_token: syncToken,
        resource_types: stringify(resourceTypes),
      }
    )
    updateState(res)
  }

  function commit() {
    // TODO: implement
  }

  // API

  const projects = {
    get: () => state.projects,
    add: createCommand<Types.ProjectAdd>('project', 'add'),
    update: createCommand<Types.ProjectUpdate>('project', 'update'),
    move: createCommand<Types.ProjectMove>('project', 'move'),
    delete: createCommand<Types.ProjectDelete>('project', 'delete'),
    archive: createCommand<Types.ProjectArchive>('project', 'archive'),
    unarchive: createCommand<Types.ProjectUnarchive>('project', 'unarchive'),
    reorder: createCommand<Types.ProjectReorder>('project', 'reorder'),
  }

  const items = {
    get: () => state.items,
    add: createCommand<Types.ItemAdd>('item', 'add'),
    update: createCommand<Types.ItemUpdate>('item', 'update'),
    move: createCommand<Types.ItemMove>('item', 'move'),
    reorder: createCommand<Types.ItemReorder>('item', 'reorder'),
    delete: createCommand<Types.ItemDelete>('item', 'delete'),
    close: createCommand<Types.ItemClose>('item', 'close'),
    complete: createCommand<Types.ItemComplete>('item', 'complete'),
    uncomplete: createCommand<Types.ItemUncomplete>('item', 'uncomplete'),
    archive: createCommand<Types.ItemArchive>('item', 'archive'),
    unarchive: createCommand<Types.ItemUnarchive>('item', 'unarchive'),
    updateDayOrders: createCommand<Types.ItemUpdateDayOrders>('item', 'update_day_orders'),
    updateDateCompleted: createCommand<Types.ItemUpdateDateComplete>('item', 'update_date_complete'),
  }

  const labels = {
    get: () => state.labels,
    add: createCommand<Types.LabelAdd>('label', 'add'),
    update: createCommand<Types.LabelUpdate>('label', 'update'),
    delete: createCommand<Types.LabelDelete>('label', 'delete'),
    deleteOccurrences: createCommand<Types.LabelDeleteOccurrences>('label', 'deleteOccurrences'),
    rename: createCommand<Types.LabelRename>('label', 'rename'),
    updateOrders: createCommand<Types.LabelUpdateOrders>('label', 'update_orders'),
  }

  const notes = {
    get: () => state.notes,
    add: createCommand<Types.NoteAdd>('note', 'add'),
    update: createCommand<Types.NoteUpdate>('note', 'update'),
    delete: createCommand<Types.NoteDelete>('note', 'delete'),
  }

  const projectNotes = {
    get: () => state.project_notes,
    add: createCommand<Types.ProjectNoteAdd>('project_note', 'add'),
    update: createCommand<Types.ProjectNoteUpdate>('project_note', 'update'),
    delete: createCommand<Types.ProjectNoteDelete>('project_note', 'delete'),
  }

  const sections = {
    get: () => state.sections,
    add: createCommand<Types.SectionAdd>('section', 'add'),
    update: createCommand<Types.SectionUpdate>('section', 'update'),
    move: createCommand<Types.SectionMove>('section', 'move'),
    reorder: createCommand<Types.SectionReorder>('section', 'reorder'),
    delete: createCommand<Types.SectionDelete>('section', 'delete'),
    archive: createCommand<Types.SectionArchive>('section', 'archive'),
    unarchive: createCommand<Types.SectionUnarchive>('section', 'unarchive'),
  }

  const filters = {
    get: () => state.filters,
    add: createCommand<Types.FilterAdd>('filter', 'add'),
    update: createCommand<Types.FilterUpdate>('filter', 'update'),
    delete: createCommand<Types.FilterDelete>('filter', 'delete'),
    updateOrders: createCommand<Types.FilterUpdateOrders>('filter', 'update_orders'),
  }

  const reminders = {
    get: () => state.reminders,
    add: createCommand<Types.ReminderAdd>('reminder', 'add'),
    update: createCommand<Types.ReminderUpdate>('reminder', 'update'),
    delete: createCommand<Types.ReminderDelete>('reminder', 'delete'),
    clearLocations: createCommand<Types.ReminderClearLocations>('reminder', 'clear_locations'),
  }

  const user = {
    get: () => state.user,
    update: createCommand<Types.UserUpdate>('user', 'update'),
    updateGoals: createCommand<Types.UserUpdateGoals>('user', 'update_goals'),
  }

  const settings = {
    get: () => state.user_settings,
    update: createCommand<Types.UserSettingsUpdate>('user_settings', 'update'),
  }

  const sharing = {
    collaborators: () => state.collaborators,
    shareProject: createCommand<Types.CollaboratorShareProject>('collaborator', 'share_project'),
    deleteCollaborator: createCommand<Types.CollaboratorDeleteCollaborator>('collaborator', 'delete_collaborator'),
    acceptInvitation: createCommand<Types.CollaboratorAcceptInvitation>('collaborator', 'accept_invitation'),
    rejectInvitation: createCommand<Types.CollaboratorRejectInvitation>('collaborator', 'reject_invitation'),
    deleteInvitation: createCommand<Types.CollaboratorDeleteInvitation>('collaborator', 'delete_invitation'),
  }

  const liveNotifications = {
    setLastRead: createCommand<Types.LiveNotificationsSetLastRead>('live_notifications', 'set_last_read'),
    markAsRead: createCommand<Types.LiveNotificationsMarkRead>('live_notifications', 'mark_read'),
    markAllAsRead: createCommand<Types.LiveNotificationsMarkReadAll>('live_notifications', 'mark_read_all'),
    markAsUnread: createCommand<Types.LiveNotificationsMarkUnread>('live_notifications', 'mark_unread'),
  }

  const business = {
    // TODO: implement
  }

  const activityLog = {
    get: (options: any) => request({ url: `${options.endpoint}/activity/get`, query: options }),
  }

  const backup = {
    // TODO: implement
  }

  const email = {
    // TODO: implement
  }

  const syncToken_ = {
    get: () => syncToken,
    set: (newToken: string) => {
      syncToken = newToken
    },
  }

  const api = {
    activityLog,
    backup,
    business,
    colorsById: COLORS_BY_ID,
    commit,
    email,
    filters,
    items,
    labels,
    liveNotifications,
    notes,
    projects,
    projectNotes,
    reminders,
    sections,
    settings,
    sharing,
    state,
    sync,
    user,
    syncToken: syncToken_,
  }

  return api
}

Todoist.colorsById = COLORS_BY_ID
Todoist.getColor = (id: Types.ColorId) => COLORS_BY_ID[id]

export default Todoist
