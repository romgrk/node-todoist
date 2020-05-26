
# todoist

This module implements v8 of Todoist Sync API described [here](https://doist.github.io/todoist-api/sync/v8/)

## Usage

```javascript

const Todoist = require('todoist')
const todoist = Todoist(process.env.TODOIST_API_KEY)

;(async () => {

  // READING DATA:
  // sync(): retrieves the latest data, incrementally.
  //         the first call retrieves all data, but you can ask
  //         for the specific data you want by passing
  //         eg ['projects', 'items']
  await todoist.sync()

  // todoist.xxxxxx.get() functions are not async functions,
  // they return the data that was already fetched by .sync()
  const items = todoist.items.get()

  // WRITING DATA:
  // the rest of the functions require arguments, refer to the offical
  // doc for details
  const newItem = await todoist.items.add({ content: 'new task!' })

  // all functions (except .get()) perform a sync before resolving,
  // therefore if you call .get() again you get the most up-to-date data

})()

```

API token available here: https://todoist.com/prefs/integrations

## API

The API is derived directly from the official documentation. It is transcribed below because
the code is so simple to read it's better this way:

```javascript

function sync(resourceTypes) { /* ... */ }

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
}

```

### Closing note on efficiency

This module is not using the Sync API to it's full capacity, as it is possible to issue
multiple commands in a single request, which this module doesn't do.

For most cases, all this doesn't matter. However if it does for you please file an
issue: https://github.com/romgrk/node-todoist/issues
