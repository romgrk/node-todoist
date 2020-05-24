/*
 * simple.js
 */

const Todoist = require('../')
const todoist = Todoist(process.env.TODOIST_API_KEY)

;(async () => {
  await todoist.v8.sync()

  const items = todoist.v8.items.get()
  console.log(items.map(i => [i.id, i.content]))

  const newItem = await todoist.v8.items.add({ content: 'new task!' })
  console.log(newItem)
})()
