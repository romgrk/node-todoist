/*
 * simple.js
 */

import { v9 as Todoist, TodoistV9Types } from '..'

const api = Todoist(process.env.TODOIST_API_KEY)

const handleItem = (item: TodoistV9Types.Item) => {
  /* … Do something with a Todoist-Item */
}

;(async () => {
  await api.sync()

  const items /* : TodoistV9Types.Item[] */ = api.items.get()
  items.map(handleItem)

  const projects /* : TodoistV9Types.Project[] */ = api.projects.get()
  projects.map(handleItem) // fails, as an item is not compatible with a project
})()
