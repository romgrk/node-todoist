# todoist

This module implements v8 of Todoist Sync API described [here](https://doist.github.io/todoist-api/sync/v8/)

## Usage

```javascript
const Todoist = require('todoist').v8
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
function sync(resourceTypes = ['all']) {
  /* ... */
}

const projects = {
  get: () => state.projects,
  add: createCommand < Types.ProjectAdd > ('project', 'add'),
  update: createCommand < Types.ProjectUpdate > ('project', 'update'),
  move: createCommand < Types.ProjectMove > ('project', 'move'),
  delete: createCommand < Types.ProjectDelete > ('project', 'delete'),
  archive: createCommand < Types.ProjectArchive > ('project', 'archive'),
  unarchive: createCommand < Types.ProjectUnarchive > ('project', 'unarchive'),
  reorder: createCommand < Types.ProjectReorder > ('project', 'reorder'),
}

const items = {
  get: () => state.items,
  add: createCommand < Types.ItemAdd > ('item', 'add'),
  update: createCommand < Types.ItemUpdate > ('item', 'update'),
  move: createCommand < Types.ItemMove > ('item', 'move'),
  reorder: createCommand < Types.ItemReorder > ('item', 'reorder'),
  delete: createCommand < Types.ItemDelete > ('item', 'delete'),
  close: createCommand < Types.ItemClose > ('item', 'close'),
  complete: createCommand < Types.ItemComplete > ('item', 'complete'),
  uncomplete: createCommand < Types.ItemUncomplete > ('item', 'uncomplete'),
  archive: createCommand < Types.ItemArchive > ('item', 'archive'),
  unarchive: createCommand < Types.ItemUnarchive > ('item', 'unarchive'),
  updateDayOrders: createCommand < Types.ItemUpdateDayOrders > ('item', 'update_day_orders'),
  updateDateCompleted: createCommand < Types.ItemUpdateDateComplete > ('item', 'update_date_complete'),
}

const labels = {
  get: () => state.labels,
  add: createCommand < Types.LabelAdd > ('label', 'add'),
  update: createCommand < Types.LabelUpdate > ('label', 'update'),
  delete: createCommand < Types.LabelDelete > ('label', 'delete'),
  updateOrders: createCommand < Types.LabelUpdateOrders > ('label', 'update_orders'),
}

const notes = {
  get: () => state.notes,
  add: createCommand < Types.NoteAdd > ('note', 'add'),
  update: createCommand < Types.NoteUpdate > ('note', 'update'),
  delete: createCommand < Types.NoteDelete > ('note', 'delete'),
}

const projectNotes = {
  get: () => state.project_notes,
  add: createCommand < Types.ProjectNoteAdd > ('project_note', 'add'),
  update: createCommand < Types.ProjectNoteUpdate > ('project_note', 'update'),
  delete: createCommand < Types.ProjectNoteDelete > ('project_note', 'delete'),
}

const sections = {
  get: () => state.sections,
  add: createCommand < Types.SectionAdd > ('section', 'add'),
  update: createCommand < Types.SectionUpdate > ('section', 'update'),
  move: createCommand < Types.SectionMove > ('section', 'move'),
  reorder: createCommand < Types.SectionReorder > ('section', 'reorder'),
  delete: createCommand < Types.SectionDelete > ('section', 'delete'),
  archive: createCommand < Types.SectionArchive > ('section', 'archive'),
  unarchive: createCommand < Types.SectionUnarchive > ('section', 'unarchive'),
}

const filters = {
  get: () => state.filters,
  add: createCommand < Types.FilterAdd > ('filter', 'add'),
  update: createCommand < Types.FilterUpdate > ('filter', 'update'),
  delete: createCommand < Types.FilterDelete > ('filter', 'delete'),
  updateOrders: createCommand < Types.FilterUpdateOrders > ('filter', 'update_orders'),
}

const reminders = {
  get: () => state.reminders,
  add: createCommand < Types.ReminderAdd > ('reminder', 'add'),
  update: createCommand < Types.ReminderUpdate > ('reminder', 'update'),
  delete: createCommand < Types.ReminderDelete > ('reminder', 'delete'),
  clearLocations: createCommand < Types.ReminderClearLocations > ('reminder', 'clear_locations'),
}

const user = {
  get: () => state.user,
  update: createCommand < Types.UserUpdate > ('user', 'update'),
  updateGoals: createCommand < Types.UserUpdateGoals > ('user', 'update_goals'),
}

const settings = {
  get: () => state.user_settings,
  update: createCommand < Types.UserSettingsUpdate > ('user_settings', 'update'),
}

const sharing = {
  collaborators: () => state.collaborators,
  shareProject: createCommand < Types.CollaboratorShareProject > ('collaborator', 'share_project'),
  deleteCollaborator: createCommand < Types.CollaboratorDeleteCollaborator > ('collaborator', 'delete_collaborator'),
  acceptInvitation: createCommand < Types.CollaboratorAcceptInvitation > ('collaborator', 'accept_invitation'),
  rejectInvitation: createCommand < Types.CollaboratorRejectInvitation > ('collaborator', 'reject_invitation'),
  deleteInvitation: createCommand < Types.CollaboratorDeleteInvitation > ('collaborator', 'delete_invitation'),
}

const liveNotifications = {
  setLastRead: createCommand < Types.LiveNotificationsSetLastRead > ('live_notifications', 'set_last_read'),
  markAsRead: createCommand < Types.LiveNotificationsMarkRead > ('live_notifications', 'mark_read'),
  markAllAsRead: createCommand < Types.LiveNotificationsMarkReadAll > ('live_notifications', 'mark_read_all'),
  markAsUnread: createCommand < Types.LiveNotificationsMarkUnread > ('live_notifications', 'mark_unread'),
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
}
```

### Closing note on efficiency

This module is not using the Sync API to it's full capacity. It is possible to issue
multiple commands in a single request, but this module doesn't.

For most cases, it doesn't matter. However if it does for you please file an
issue: https://github.com/romgrk/node-todoist/issues
