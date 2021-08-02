import { v8 as Todoist } from './index'
import { config } from 'dotenv'
import { NodeType } from './v8-types'
import path from 'path'
config({ path: path.basename(__dirname + '/.env') })

type ApiType = ReturnType<typeof Todoist>
let api: ApiType

describe('initialization', () => {
  it('fails with invalid api key', () => {
    expect(() => {
      api = Todoist('invalid')
    }).toThrow()
  })

  it('works', () => {
    api = Todoist(process.env.TODOIST_API_KEY as string)
  })

  test('.sync() properly', async () => {
    await api.sync()
  })
})

describe('.items CRUD', () => {
  let newItem: NodeType | undefined

  test('.get() returns data', () => {
    const items = api.items.get()
    expect(items).toBeInstanceOf(Array)
  })

  test('.add() works', async () => {
    newItem = await api.items.add({ content: 'testing-task' })
    expect(newItem).toMatchObject({ content: 'testing-task' })
  })

  test('.delete() works', async () => {
    if (!newItem) return
    await api.items.delete({ id: newItem.id })
    const deletedItem = api.items.get().find((item) => item.id === newItem?.id)
    expect(deletedItem).toBeUndefined()
  })
})

describe('.items due dates', () => {
  let item: NodeType | undefined

  afterEach(async () => {
    if (item) {
      await api.items.delete({ id: item.id })
    }
  })

  test('.add() with string due date', async () => {
    item = await api.items.add({ content: 'testing-task', due: { string: '17th of july 2021' } })
    expect(item).toMatchObject({
      content: 'testing-task',
      due: {
        date: '2021-07-17',
        is_recurring: false,
        lang: 'en',
        string: '17th of july 2021',
        timezone: null,
      },
    })
  })

  test('.add() with due date', async () => {
    item = await api.items.add({
      content: 'testing-task',
      due: { date: '2018-10-14' },
    })
    console.log(item)
    expect(item).toMatchObject({
      content: 'testing-task',
      due: {
        date: '2018-10-14',
        is_recurring: false,
        lang: 'en',
        string: '2018-10-14',
        timezone: null,
      },
    })
  })
})
