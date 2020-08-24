/*
 * simple.js
 */

import { v8 as Todoist, TodoistV8Types } from '..'

const api = Todoist(process.env.TODOIST_API_KEY)

const handleItem = (item: TodoistV8Types.Item) => {
  /* … Do something with a Todoist-Item */
}

;(async () => {
  await api.sync()

  const items /* : TodoistV8Types.Item[] */ = api.items.get()
  items.map(handleItem)

  const projects /* : TodoistV8Types.Project[] */ = api.projects.get()
  projects.map(handleItem) // fails, as an item is not compatible with a project
})()
