import { Todoist as TodoistV9 } from './v9'
import * as TodoistV9Types from './v9-types'

// export V8 as the current version
export const Todoist = TodoistV9

// create backwards compatibility list
export const v9 = TodoistV9
// export Types as well
export { TodoistV9Types }
