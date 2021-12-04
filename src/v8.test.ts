import { config } from 'dotenv'
import path from 'path'
import { createTodoistResponse, nock, respondToSync } from './fixtures/requests'
import { SectionUpdate, v8 as Todoist } from './index'
import { NodeType } from './v8-types'

config({ path: path.basename(__dirname + '/.env') })

type ApiType = ReturnType<typeof Todoist>
let api: ApiType

const TODOIST_API_KEY = '1234567890abcdef1234567890abcdef12345678' // 40 char string
const SYNC_TOKEN = 'SYNC_TOKEN'

describe('initialization', () => {
  it('fails with invalid api key', () => {
    expect(() => {
      api = Todoist('invalid')
    }).toThrow()
  })

  it('works', () => {
    api = Todoist(TODOIST_API_KEY)
  })

  it('.sync() properly', async () => {
    nock.post('/sync/v8/sync').reply(200, createTodoistResponse({ sync_token: SYNC_TOKEN }))

    await api.sync()
  })
})

describe('.items CRUD', () => {
  let newItem: NodeType | undefined

  it('.get() returns data', () => {
    const items = api.items.get()
    expect(items).toBeInstanceOf(Array)
  })

  it('.add() works', async () => {
    respondToSync((commands, id) => ({
      items: [
        {
          id,
          ...commands.args,
        },
      ],
    }))
    newItem = await api.items.add({ content: 'testing-task' })
    expect(newItem).toMatchObject({ content: 'testing-task' })
  })

  it('.delete() works', async () => {
    if (!newItem) return
    respondToSync((commands) => {
      expect(commands.type).toBe('item_delete')
      expect(commands.args).toMatchObject({ id: newItem!.id })
      return {}
    })
    await api.items.delete({ id: newItem.id })
    const deletedItem = api.items.get().find((item) => item.id === newItem?.id)
    expect(deletedItem).toBeUndefined()
  })
})

describe('.items due dates', () => {
  it('.add() with string due date', async () => {
    respondToSync((commands, id) => {
      return {
        items: [
          {
            id,
            ...commands.args,
            // this is a example of how the todoist api parses the { string: '17th of july 2021' } date
            due: {
              date: '2021-07-17',
              is_recurring: false,
              lang: 'en',
              string: '17th of july 2021',
              timezone: null,
            },
          },
        ],
      }
    })

    const item = await api.items.add({ content: 'testing-task', due: { string: '17th of july 2021' } })
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

  it('.add() with due date', async () => {
    respondToSync((commands, id) => {
      return {
        items: [
          {
            id,
            ...commands.args,
            // this is a example of how the todoist api parses the { string: '17th of july 2021' } date
            due: {
              date: '2018-10-14',
              is_recurring: false,
              lang: 'en',
              string: '2018-10-14',
              timezone: null,
            },
          },
        ],
      }
    })
    const item = await api.items.add({
      content: 'testing-task',
      due: { date: '2018-10-14' },
    })

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

describe('issue-26', () => {
  beforeEach(() => {
    api = Todoist(TODOIST_API_KEY)
  })

  describe('SectionUpdate', () => {
    it('should allow sections to be updated', async () => {
      const fn = async (section: SectionUpdate) => {}

      // this is expected to work with typescript
      fn({
        id: 1,
        name: 'test',
      })
    })
  })
})
