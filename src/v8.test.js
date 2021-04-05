/*
 * v8.test.js
 */

const Todoist = require('./index').v8

let api

describe('initialization', () => {
  it('fails with invalid api key', () => {
    expect(() => {
      api = Todoist('invalid')
    }).toThrow()
  })

  it('works', () => {
    api = Todoist(process.env.TODOIST_API_KEY)
  })

  test('.sync() properly', async () => {
    await api.sync()
  })
})


describe('.items', () => {
  let newItem

  test('.get() returns data', () => {
    const items = api.items.get()
    expect(items).toBeInstanceOf(Array)
  })

  test('.add() works', async () => {
    newItem = await api.items.add({ content: 'testing-task' })
    expect(newItem).toMatchObject({ content: 'testing-task' })
  })

  test('.delete() works', async () => {
    await api.items.delete({ id: newItem.id })
    const deletedItem = api.items.get().find(item => item.id === newItem.id)
    expect(deletedItem).toBeUndefined()
  })
})
