/*
 * simple.js
 */

const Todoist = require('../').v8
const api = Todoist(process.env.TODOIST_API_KEY)

;(async () => {

  await api.sync()

  const items = api.items.get()
  console.log(items.map(i => [i.id, i.content]))

  const newItem = await api.items.add({ content: 'new task!' })
  console.log(newItem)

  const res = await api.items.delete({ id: newItem.id })
  console.log(res)

  // console.log(api.state)
  // console.log(await api.activityLog.get({ object_type: 'project' }))
  // const interval = setInterval(() => {}, 100000)

})()
