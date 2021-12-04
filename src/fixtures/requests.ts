import Nock from 'nock'
import { TodoistResponse } from '../index'

export const nock = Nock('https://api.todoist.com')

export const extractCommandsFromRequestBoby = (body: Nock.Body) => {
  if (typeof body !== 'string') throw new Error('Body must be a string')
  const commandsString = body.split('&').find((x) => x.startsWith('commands='))
  if (!commandsString) throw new Error('commands not found')
  return JSON.parse(decodeURIComponent(commandsString).substr(9))[0]
}

export const createTodoistResponse = (response: Partial<TodoistResponse> = {}) => ({
  sync_status: {},
  temp_id_mapping: {},
  sync_token: 'random',
  full_sync: true,
  collaborator_states: [],
  collaborators: [],
  day_orders_timestamp: '1591810376.59',
  day_orders: [],
  due_exceptions: [],
  filters: [],
  incomplete_item_ids: [],
  incomplete_project_ids: [],
  items: [],
  labels: [],
  live_notifications_last_read_id: 0,
  live_notifications: [],
  locations: [],
  notes: [],
  project_notes: [],
  projects: [],
  reminders: [],
  sections: [],
  stats: [],
  tooltips: [],
  user_settings: null,
  user: null,
  ...response,
})

export const respondToSync = (
  handle: (commands: any, mappingId: number) => Partial<TodoistResponse>,
  mappingId: number = 1
) =>
  nock.post('/sync/v8/sync').reply(200, (uri, body) => {
    const commands = extractCommandsFromRequestBoby(body)
    return createTodoistResponse({
      sync_status: {
        [commands.uuid]: 'ok',
      },
      temp_id_mapping: {
        [commands.temp_id]: mappingId,
      },
      ...handle(commands, mappingId),
    })
  })
