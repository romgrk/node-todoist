
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
  await todoist.v8.sync()

  // todoist.v8.xxxxxx.get() functions are not async functions,
  // they return the data that was already fetched by .sync()
  const items = todoist.v8.items.get()
  console.log(items.map(i => [i.id, i.content]))

  // WRITING DATA:
  // the rest of the functions require arguments, refer to the offical
  // doc for details
  const newItem = await todoist.v8.items.add({ content: 'new task!' })
  console.log(newItem)

  // all functions (except .get()) perform a .sync() before resolving,
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
  get:     () => data.projects,
  add:     (options) => command('project', 'add', options),
  update:  (options) => command('project', 'update', options),
  move:    (options) => command('project', 'move', options),
  delete:  (options) => command('project', 'delete', options),
  archive:  (options) => command('project', 'archive', options),
  unarchive:  (options) => command('project', 'unarchive', options),
  reorder: (options) => command('project', 'reorder', options),
}

const items = {
  get:     () => data.items,
  getAll:  () => client(`${BASE}/completed/get_all`, { form: { token } }),
  add:     (options) => command('item', 'add', options),
  update:  (options) => command('item', 'update', options),
  move:    (options) => command('item', 'move', options),
  reorder: (options) => command('item', 'reorder', options),
  delete:  (options) => command('item', 'delete', options),
  complete:  (options) => command('item', 'complete', options),
  uncomplete:  (options) => command('item', 'uncomplete', options),
  archive:  (options) => command('item', 'archive', options),
  unarchive:  (options) => command('item', 'unarchive', options),
  updateDateCompleted:  (options) => command('item', 'update_date_complete', options),
  close:  (options) => command('item', 'close', options),
  updateDayOrders:  (options) => command('item', 'update_day_orders', options),
}

const labels = {
  get:     () => data.labels,
  add:     (options) => command('label', 'add', options),
  update:  (options) => command('label', 'update', options),
  delete:  (options) => command('label', 'delete', options),
  updateOrders: (options) => command('label', 'update_orders', options),
}

const notes = {
  get:     () => data.notes,
  add:     (options) => command('note', 'add', options),
  update:  (options) => command('note', 'update', options),
  delete:  (options) => command('note', 'delete', options),
}

const sections = {
  get:     () => data.sections,
  add:     (options) => command('section', 'add', options),
  update:  (options) => command('section', 'update', options),
  move:    (options) => command('section', 'move', options),
  reorder: (options) => command('section', 'reorder', options),
  delete:  (options) => command('section', 'delete', options),
  archive:  (options) => command('section', 'archive', options),
  unarchive:  (options) => command('section', 'unarchive', options),
}

const filters = {
  get:     () => data.filters,
  add:     (options) => command('filter', 'add', options),
  update:  (options) => command('filter', 'update', options),
  delete:  (options) => command('filter', 'delete', options),
  updateOrders: (options) => command('filter', 'update_orders', options),
}

const reminders = {
  get:     () => data.reminders,
  add:     (options) => command('reminder', 'add', options),
  update:  (options) => command('reminder', 'update', options),
  delete:  (options) => command('reminder', 'delete', options),
  clearLocations: (options) => command('reminder', 'clear_locations', options),
}

// exported API
const v8 = {
  sync,
  projects,
  items,
  notes,
  sections,
  filters,
  reminders,
}

```

### Note on performance

As mentionned in the usage section, this module does `.sync()` requests for every
command. It's convenient in that it can be the source of truth for data; otherwise
it is left to the client to do some bookkeeping as to merge and clean items as they
are added, updated or removed. This however slightly increases the latency because
2 HTTP requests will be made instead of 1.

This is also not using the Sync API to it's full capacity, as it is possible to issue
multiple commands in a single request, which this module doesn't do. (eg project_add
+ item_add)

For most cases, all this doesn't matter. However if it does for you please file an
issue: https://github.com/romgrk/node-todoist/issues
