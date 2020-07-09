import { Todoist as TodoistV8 } from './v8'
import * as TodoistV8Types from './v8-types'

// export V8 as the current version
export const Todoist = TodoistV8

// create backwards compatibility list
export const v8 = TodoistV8
// export Types as well
export { TodoistV8Types }
