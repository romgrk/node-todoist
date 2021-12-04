import { Todoist as TodoistV8 } from './v8'
import type * as TodoistV8Types from './v8-types'
export * from './types'
export * from './v8-types'
export { TodoistV8Types }

// export V8 as the current version
export const Todoist = TodoistV8

// create backwards compatibility list
export const v8 = TodoistV8
