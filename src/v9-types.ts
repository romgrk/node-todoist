export interface NodeType {
  id: number
  is_deleted?: Boolean | boolean
}

export type Id = number | string

export type FileUpload = never

export interface DueDate {
  /** Due date in the format of YYYY-MM-DD (RFC 3339). For recurring dates, the date of the current iteration. */
  date: string
  /** Always set to null. */
  timezone: string
  /** Human-readable representation of due date. String always represents the due object in user’s timezone. Look at our reference to see which formats are supported. */
  string: string
  /** Lang which has to be used to parse the content of the string attribute. Used by clients and on the server side to properly process due dates when date object is not set, and when dealing with recurring tasks. Valid languages are: en, da, pl, zh, ko, de, pt, ja, it, fr, sv, ru, es, nl. */
  lang: string
  /** Boolean flag which is set to true is due object represents a recurring due date */
  is_recurring: boolean
}

export interface DueDateInputString {
  string: string
  timezone?: string
}

export interface DueDateInputDate {
  date: string
}

export type DueDateInput = DueDateInputString | DueDateInputDate

export type Boolean = 0 | 1

export type Priority = 1 | 2 | 3 | 4

export type ColorId = 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49

export type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type ThemeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type LanguageId =
  | 'da'
  | 'de'
  | 'en'
  | 'es'
  | 'fi'
  | 'fr'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt_BR'
  | 'ru'
  | 'sv'
  | 'tr'
  | 'zh_CN'
  | 'zh_TW'

export interface Item extends NodeType {
  /** The id of the task. */
  id: number
  /** The legacy id of the task */
  /** (only shown for objects created before 1 April 2017) */
  legacy_id?: number
  //The owner of the task.
  user_id: number
  /** Project that the task resides in */
  project_id: number
  /** Legacy project id for the project that the task resides in */
  /** (only shown for objects created before 1 April 2017) */
  legacy_project_id?: number
  /** The text of the task */
  content: string
  /** The due date of the task. See the Due dates section for more details. */
  due: DueDate
  /** The priority of the task (a number between 1 and 4, 4 for very urgent and 1 for natural). */
  /** Note: Keep in mind that very urgent is the priority 1 on clients. So, p1 will return 4 in the API. */
  priority: Priority
  /** The id of the parent task. Set to null for root tasks */
  parent_id: number
  /** The legacy id of the parent task. Set to null for root tasks */
  /** (only shown for objects created before 1 April 2017) */
  legacy_parent_id?: number
  /** The order of task. Defines the position of the task among all the tasks with the same parent_id */
  child_order: number
  /** The id of the section. Set to null for tasks not belonging to a section. */
  section_id: number
  /** The order of the task inside the Today or Next 7 days view (a number, where the smallest value would place the task at the top). */
  day_order: number
  /** Whether the task’s sub-tasks are collapsed (where 1 is true and 0 is false). */
  collapsed: Boolean
  /** The tasks labels (a list of label ids such as [2324,2525]). */
  labels: number[]
  /** The id of the user who created the current task. This makes sense for shared projects only. For tasks, created before 31 Oct 2019 the value is set to null. Cannot be set explicitly or changed via API. */
  added_by_uid?: number
  /** The id of the user who assigns the current task. This makes sense for shared projects only. Accepts any user id from the list of project collaborators. If this value is unset or invalid, it will automatically be set up to your uid. */
  assigned_by_uid?: number
  /** The id of user who is responsible for accomplishing the current task. This makes sense for shared projects only. Accepts any user id from the list of project collaborators or null or an empty string to unset. */
  responsible_uid?: number
  /** Whether the task is marked as completed (where 1 is true and 0 is false). */
  checked: Boolean
  /** Whether the task has been marked as completed and is marked to be moved to history, because all the child tasks of its parent are also marked as completed (where 1 is true and 0 is false) */
  in_history: Boolean
  /** Whether the task is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** Identifier to find the match between tasks in shared projects of different collaborators. When you share a task, its copy has a different ID in the projects of your collaborators. To find a task in another account that matches yours, you can use the “sync_id” attribute. For non-shared tasks, the attribute is null. */
  sync_id: number | null
  /** The date when the task was completed (or null if not completed). */
  date_completed: null | string
  /** The date when the task was created. */
  date_added: string
}

export interface ItemAdd {
  /** The text of the task. */
  content: string
  /** The id of the project to add the task to (a number or a temp id). By default the task is added to the user’s Inbox project. */
  project_id?: Id
  /** The due date of the task. See the Due dates section for more details. */
  due?: DueDateInput
  /** The priority of the task (a number between 1 and 4, 4 for very urgent and 1 for natural). */
  /** Note: Keep in mind that very urgent is the priority 1 on clients. So, p1 will return 4 in the API. */
  priority?: Priority
  /** The id of the parent task. Set to null for root tasks */
  parent_id?: number
  /** The order of task. Defines the position of the task among all the tasks with the same parent_id */
  child_order?: number
  /** The id of the section. Set to null for tasks not belonging to a section. */
  section_id?: number
  /** The order of the task inside the Today or Next 7 days view (a number, where the smallest value would place the task at the top). */
  day_order?: DayId
  /** Whether the task’s sub-tasks are collapsed (where 1 is true and 0 is false). */
  collapsed?: Boolean
  /** The tasks labels (a list of label ids such as [2324,2525]). */
  labels?: number[]
  /** The id of user who assigns the current task. This makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will be automatically setup to your uid. */
  assigned_by_uid?: number
  /** The id of user who is responsible for accomplishing the current task. This makes sense for shared projects only. Accepts any user id from the list of project collaborators or null or an empty string to unset. */
  responsible_uid?: number
  /** When this option is enabled, the default reminder will be added to the new item if it has a due date with time set. See also the auto_reminder user option for more info about the default reminder. */
  auto_reminder?: boolean
  /** When this option is enabled, the labels will be parsed from the task content and added to the task. In case the label doesn’t exist, a new one will be created. */
  auto_parse_labels?: boolean
}

export interface ItemUpdate {
  /** The id of the task. */
  id: Id
  /** The text of the task. */
  content?: string
  /** The due date of the task. See the Due dates section for more details. */
  due?: DueDate
  /** The priority of the task (a number between 1 and 4, 4 for very urgent and 1 for natural). */
  /** Note: Keep in mind that very urgent is the priority 1 on clients. So, p1 will return 4 in the API. */
  priority?: Priority
  /** Whether the task’s sub-tasks are collapsed (where 1 is true and 0 is false). */
  collapsed?: Boolean
  /** The tasks labels (a list of label ids such as [2324,2525]). */
  labels?: number[]
  /** The id of the user who assigns the current task. This makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will be automatically setup to your uid. */
  assigned_by_uid?: number
  /** The id of user who is responsible for accomplishing the current task. This makes sense for shared projects only. Accepts any user id from the list of project collaborators or null or an empty string to unset. */
  responsible_uid?: number
  /** The order of the task inside the Today or Next 7 days view (a number, where the smallest value would place the task at the top). */
  day_order?: DayId
}

export interface ItemMove {
  /** The id of the task. */
  id: Id
  /** Id of the destination parent task. The task becomes the last child task of the parent task. */
  parent_id?: Id
  /** Id of the destination section. The task becomes the last root task of the section. */
  section_id?: Id
  /** Id of the destination project. The task becomes the last root task of the project. */
  project_id?: Id
}

export interface ItemReorder {
  /** An array of objects to update. Each object contains two attribute: id of the item to update and child_order, the new order. */
  items: {
    id: number
    child_order: number
  }[]
}

export interface ItemDelete {
  id: Id
}

export interface ItemComplete {
  /** Task id to complete. */
  id: Id
  /** RFC3339-formatted date of completion of the task (in UTC). If not set, the server will set the value to the current timestamp */
  date_completed?: string
  /** When enabled the item is moved to history irregardless of whether it’s a sub-task or not (by default only root tasks are moved to history). */
  force_history?: boolean
}

export interface ItemUncomplete {
  /** Task id to uncomplete */
  id: Id
}

export interface ItemArchive {
  /** Task id to archive. */
  id: Id
}

export interface ItemUnarchive {
  /** Task id to unarchive */
  id: Id
}

export interface ItemUpdateDateComplete {
  /** The id of the item to update (a number or a temp id). */
  id: Id
  /** The due date of the task. See the Due dates section for more details. */
  due?: DueDate
}

export interface ItemClose {
  /** The id of the item to close (a number or a temp id). */
  id: Id
}

export interface ItemUpdateDayOrders {
  /** A dictionary, where an item id is the key, and the day order its value: item_id: day_order. */
  ids_to_orders: Record<number, DayId>
}

export interface Project extends NodeType {
  /** The id of the project. */
  id: number
  /** The legacy id of the project. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_id?: number
  /** The name of the project. */
  name: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color: ColorId
  /** The id of the parent project. Set to null for root projects. */
  parent_id: number
  /** The legacy id of the parent project. Set to null for root projects. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_parent_id?: number
  /** The order of project. Defines the position of the task among all the projects with the same parent_id */
  child_order: number
  /** Whether the project’s sub-projects are collapsed (where 1 is true and 0 is false). */
  collapsed: number
  /** Whether the project is shared (a true or false value). */
  shared: boolean
  /** Whether the project is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** Whether the project is marked as archived (where 1 is true and 0 is false). */
  is_archived: Boolean
  /** Whether the project is favorite (where 1 is true and 0 is false). */
  is_favorite: Boolean
  /** Identifier to find the match between different copes of shared projects. When you share a project, its copy has a different ID for your collaborators. To find a project in a different account that matches yours, you can use the “sync_id” attribute. For non-shared projects the attribute is set to null. */
  sync_id: number | null
  /** Whether the project is Inbox (true or otherwise this property is not sent). */
  inbox_project?: true
  /** Whether the project is TeamInbox (true or otherwise this property is not sent). */
  team_inbox?: true
}

export interface ProjectAdd {
  /** The name of the project (a string value). */
  name: String
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** The id of the parent project. Set to null for root projects */
  parent_id?: Id
  /** The order of project. Defines the position of the task among all the projects with the same parent_id */
  child_order?: number
  /** Whether the project is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface ProjectUpdate {
  /** The id of the project (could be temp id). */
  id: Id
  /** The name of the project (a string value). */
  name?: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** Whether the project’s sub-projects are collapsed (where 1 is true and 0 is false). */
  collapsed?: Boolean
  /** Whether the project is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface ProjectMove {
  /** The id of the project (could be temp id). */
  id: Id
  /** The id of the parent project (could be temp id). If set to null, the project will be moved to the root */
  parent_id: Id
}

export interface ProjectDelete {
  /** Id of the project to delete (could be a temp id). */
  id: Id
}

export interface ProjectArchive {
  /** Id of the project to archive (could be a temp id). */
  id: Id
}

export interface ProjectUnarchive {
  /** Id of the project to unarchive (could be a temp id). */
  id: Id
}

export interface ProjectReorder {
  /** An array of objects to update. Each object contains two attribute: id of the project to update and child_order, the new order. */
  projects: {
    id: Id
    child_order: number
  }[]
}

export interface Label extends NodeType {
  /** The id of the label. */
  id: number
  /** The name of the label. */
  name: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color: ColorId
  /** Label’s order in the label list (a number, where the smallest value should place the label at the top). */
  item_order: number
  /** Whether the label is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** Whether the label is favorite (where 1 is true and 0 is false). */
  is_favorite: Boolean
}

export interface LabelAdd {
  /** The name of the label */
  name: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** Label’s order in the label list (a number, where the smallest value should place the label at the top). */
  item_order?: number
  /** Whether the label is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface LabelUpdate {
  /** The id of the label. */
  id: Id
  /** The name of the label. */
  name?: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** Label’s order in the label list. */
  item_order?: number
  /** Whether the label is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface LabelDelete {
  /** The id of the label. */
  id: Id
}

export interface LabelUpdateOrders {}

export interface ProjectNote extends NodeType {
  /** The id of the note. */
  id: number
  /** The id of the user that posted the note. */
  posted_uid: number
  /** The project which the note is part of. */
  project_id: number
  /** The content of the note. */
  content: string
  /** A file attached to the note (see more details about attachments later on). */
  file_attachment: FileUpload
  /** A list of user ids to notify. */
  uids_to_notify: number[]
  /** Whether the note is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** The date when the note was posted. */
  posted: string
  /** List of emoji reactions and corresponding user ids.
   * {"❤️": [14781321], "👍": [14781321, 12213313]}
   */
  reactions: Record<string, number[]>
}

export interface ProjectNoteAdd {
  /** The project which the note is part of. */
  project_id: Id
  /** The content of the note. */
  content: string
  /** A file attached to the note (see more details about attachments above, and learn how to upload a file in the Uploads section). */
  file_attachment?: FileUpload
}

export interface ProjectNoteUpdate {
  /** The project which the note is part of. */
  id: Id
  /** The content of the note. */
  content: string
  /** A file attached to the note (see more details about attachments above, and learn how to upload a file in the Uploads section). */
  file_attachment?: FileUpload
}

export interface ProjectNoteDelete {
  /** The id of the note. */
  id: Id
}

export interface Note extends NodeType {
  /** The id of the note. */
  id: number
  /** The legacy id of the note. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_id?: number
  /** The id of the user that posted the note. */
  posted_uid: number
  /** The item which the note is part of. */
  item_id: number
  /** The legacy item which the note is part of. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_item_id?: number
  /** The project which the note is part of. */
  project_id: number
  /** The legacy project which the note is part of. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_project_id?: number
  /** The content of the note. */
  content: string
  /** A file attached to the note (see more details about attachments later on). */
  file_attachment: object
  /** A list of user ids to notify. */
  uids_to_notify: number[]
  /** Whether the note is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** The date when the note was posted. */
  posted: string
  /** List of emoji reactions and corresponding user ids. */
  reactions: object
}

export interface NoteAdd {
  /** The item which the note is part of (a unique number or temp id). */
  item_id: number
  /** The content of the note (a string value). */
  content: string
  /** A file attached to the note (see more details about attachments above, and learn how to upload a file in the Uploads section). */
  file_attachment?: FileUpload
  /** A list of user ids to notify. */
  uids_to_notify?: number[]
}

export interface NoteUpdate {
  /** The id of the note. */
  id: Id
  /** The content of the note. */
  content: string
  /** A file attached to the note (see more details about attachments above, and learn how to upload a file in the Uploads section). */
  file_attachment?: FileUpload
}

export interface NoteDelete {
  /** The id of the note. */
  id: Id
}

export interface Section extends NodeType {
  /** The id of the section. */
  id: number
  /** The name of the section. */
  name: string
  /** Project that the section resides in */
  project_id: number
  /** Legacy project id for the project that the section resides in */
  /** (only shown for objects created before 1 April 2017) */
  legacy_project_id?: number
  /** The order of section. Defines the position of the section among all the sections in the project */
  section_order: number
  /** Whether the section’s tasks are collapsed (a true or false value). */
  collapsed: boolean
  /** A special id for shared sections (a number or null if not set). Used internally and can be ignored. */
  sync_id: number | null
  /** Whether the section is marked as deleted (a true or false value). */
  is_deleted: boolean
  /** Whether the section is marked as archived (a true or false value). */
  is_archived: boolean
  /** The date when the section was archived (or null if not archived). */
  date_archived: string
  /** The date when the section was created. */
  date_added: string
}

export interface SectionAdd {
  /** The name of the section. */
  name: string
  /** Project that the section resides in */
  project_id: Id
  /** The order of section. Defines the position of the section among all the sections in the project */
  section_order?: number
}

export interface SectionUpdate {
  /** The name of the section. */
  name: String
  /** Whether the section’s tasks are collapsed (where 1 is true and 0 is false). */
  collapsed?: Boolean
}

export interface SectionMove {
  /** The id of the section. */
  id: Id
  /** Id of the destination project. */
  project_id?: Id
}

export interface SectionReorder {
  /** An array of objects to update. Each object contains two attributes: id of the section to update and section_order, the new order. */
  sections: {
    id: Id
    section_order: number
  }[]
}

export interface SectionDelete {
  /** Id of the section to delete. */
  id: Id
}

export interface SectionArchive {
  /** Id of the section to archive. */
  id: Id
}

export interface SectionUnarchive {
  /** Id of the section to unarchive. */
  id: Id
}

export interface Filter extends NodeType {
  /** The id of the filter. */
  id: number
  /** The name of the filter. */
  name: string
  /** The query to search for. Examples of searches can be found in the Todoist help page. */
  query: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color: ColorId
  /** Filter’s order in the filter list (where the smallest value should place the filter at the top). */
  item_order: number
  /** Whether the filter is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
  /** Whether the filter is favorite (where 1 is true and 0 is false). */
  is_favorite: Boolean
}

export interface FilterAdd {
  /** The name of the filter. */
  name: string
  /** The query to search for. Examples of searches can be found in the Todoist help page. */
  query: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** Filter’s order in the filter list (the smallest value should place the filter at the top). */
  item_order?: number
  /** Whether the filter is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface FilterUpdate {
  /** The id of the filter. */
  id: Id
  /** The name of the filter */
  name?: string
  /** The query to search for. Examples of searches can be found in the Todoist help page. */
  query?: string
  /** Color id. It’s a value between 30 and 49, refer to Colors for more info. */
  color?: ColorId
  /** Filter’s order in the filter list (where the smallest value should place the filter at the top). */
  item_order?: number
  /** Whether the filter is favorite (where 1 is true and 0 is false). */
  is_favorite?: Boolean
}

export interface FilterDelete {
  /** Yes	The id of the filter. */
  id: Id
}

export interface FilterUpdateOrders {
  /** Yes	A dictionary, where a filter id is the key, and the order its value: filter_id: order. */
  id_order_mapping: {
    id: Id
    filter_id: number
  }[]
}

export interface Reminder extends NodeType {
  /** The id of the reminder. */
  id: number
  /** The user id which should be notified of the reminder, typically the current user id creating the reminder. */
  notify_uid: number
  /** The item id for which the reminder is about. */
  item_id: number
  /** The way to get notified of the reminder: email for e-mail, mobile for mobile text message, or push for mobile push notification. */
  service: string
  /** The type of the reminder: relative for a time-based reminder specified in minutes from now, absolute for a time-based reminder with a specific time and date in the future, and location for a location-based reminder. */
  type: string
  /** The due date of the reminder. See the Due dates section for more details. Note that reminders only support due dates with time, since full-day reminders don’t make sense. */
  due: object
  /** The relative time in minutes before the due date of the item, in which the reminder should be triggered. Note that the item should have a due date set in order to add a relative reminder. */
  mm_offset: number
  /** An alias name for the location. */
  name: string
  /** The location latitude. */
  loc_lat: string
  /** The location longitude. */
  loc_long: string
  /** What should trigger the reminder: on_enter for entering the location, or on_leave for leaving the location. */
  loc_trigger: string
  /** The radius around the location that is still considered as part of the location (in meters). */
  radius: number
  /** Whether the reminder is marked as deleted (where 1 is true and 0 is false). */
  is_deleted: Boolean
}

export interface ReminderAdd {
  /** The item id for which the reminder is about. */
  item_id: Id
  /** The type of the reminder: relative for a time-based reminder specified in minutes from now, absolute for a time-based reminder with a specific time and date in the future, and location for a location-based reminder. */
  type: string
  /** The user id which should be notified of the reminder, typically the current user id creating the reminder. */
  notify_uid?: number
  /** The way to get notified of the reminder?: email for e-mail, mobile for mobile text message, or push for mobile push notification. */
  service?: string
  /** The due date of the reminder. See the Due dates section for more details. Note that reminders only support due dates with time, since full-day reminders don’t make sense. */
  due?: DueDate
  /** The relative time in minutes before the due date of the item, in which the reminder should be triggered. Note, that the item should have a due date set in order to add a relative reminder. */
  minute_offset?: number
  /** An alias name for the location. */
  name?: string
  /** The location latitude. */
  loc_lat?: string
  /** The location longitude. */
  loc_long?: string
  /** What should trigger the reminder?: on_enter for entering the location, or on_leave for leaving the location. */
  loc_trigger?: string
  /** The radius around the location that is still considered as part of the location (in meters). */
  radius?: number
}

export interface ReminderUpdate {
  /** The id of the reminder. */
  id: Id
  /** The user id which should be notified of the reminder, typically the current user id creating the reminder. */
  notify_uid?: number
  /** The way to get notified of the reminder: email for e-mail, mobile for mobile text message, or push for mobile push notification. */
  service?: string
  /** The type of the reminder: relative for a time-based reminder specified in minutes from now, absolute for a time-based reminder with a specific time and date in the future, and location for a location-based reminder. */
  type?: string
  /** due date of the reminder. See the Due dates section for more details. Note that reminders only support due dates with time, since full-day reminders don’t make sense. */
  due?: DueDate
  /** The relative time in minutes before the due date of the item, in which the reminder should be triggered. Note, that the item should have a due date set in order to add a relative reminder. */
  minute_offset?: number
  /** An alias name for the location. */
  name?: string
  /** The location latitude. */
  loc_lat?: string
  /** The location longitude. */
  loc_long?: string
  /** What should trigger the reminder: on_enter for entering the location, or on_leave for leaving the location. */
  loc_trigger?: string
  /** The radius around the location that is still considered as part of the location (in meters). */
  radius?: number
}

export interface ReminderDelete {
  /** Yes	The id of the filter. */
  id: Id
}

export interface ReminderClearLocations {}

export interface User extends NodeType {
  /** The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task. */
  auto_reminder: number
  /** The link to a 195x195 pixels image of the user’s avatar. */
  avatar_big: string
  /** The link to a 60x60 pixels image of the user’s avatar. */
  avatar_medium: string
  /** The link to a 640x640 pixels image of the user’s avatar. */
  avatar_s640: string
  /** The link to a 35x35 pixels image of the user’s avatar. */
  avatar_small: string
  /** The id of the user’s business account. */
  business_account_id: number
  /** The daily goal number of completed tasks for karma */
  daily_goal: number
  /** Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1). */
  date_format: Boolean
  /** Whether smart date recognition has been disabled (a true or false value). */
  dateist_inline_disabled: boolean
  /** The language expected for date recognition instead of the user’s lang (null if the user’s lang determines this), one of the following values: da, de, en, es, fi, fr, it, ja, ko, nl, pl, pt_BR, ru, sv, tr, zh_CN, zh_TW. */
  dateist_lang: LanguageId | null
  /** Array of integers representing user’s days off (between 1 and 7, where 1 is Monday and 7 is Sunday). */
  days_off: DayId[]
  /** The default reminder for the user. Reminders are only possible for Premium users. The default reminder can be one of the following: email to send reminders by email, mobile to send reminders to mobile devices via SMS, push to send reminders to smart devices using push notifications (one of the Android or iOS official clients must be installed on the client side to receive these notifications), no_default to turn off sending default reminders. */
  default_reminder: string
  /** The user’s email. */
  email: string
  /** Used internally for any special features that apply to the user. Current special features include whether the user has enabled beta, whether dateist_inline_disabled that is inline date parsing support is disabled, whether the dateist_lang is set which overrides the date parsing language, whether the gold_theme has been awarded to the user, whether the user has_push_reminders enabled, whether the user has karma_disabled, whether the user has karma_vacation mode enabled, and whether any special restriction applies to the user. */
  features: object
  /** The user’s real name formatted as Firstname Lastname. */
  full_name: string
  /** The user’s id. */
  id: number
  /** The id of the user’s avatar. */
  image_id: string
  /** The id of the user’s Inbox project. */
  inbox_project: number
  /** Whether the user is a business account administrator (a true or false value). */
  is_biz_admin: boolean
  /** Whether the user has a Premium subscription (a true or false value). */
  is_premium: boolean
  /** The date when the user joined Todoist. */
  join_date: string
  /** The user’s karma score. */
  karma: number
  /** The user’s karma trend (for example up). */
  karma_trend: string
  /** The user’s language, which can take one of the following values: da, de, en, es, fi, fr, it, ja, ko, nl, pl, pt_BR, ru, sv, tr, zh_CN, zh_TW. */
  lang: LanguageId
  /** The legacy id of the user’s Inbox project. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_inbox_project?: number
  /** The legacy id of the Team Inbox project. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_team_inbox?: number
  /** The user’s mobile host (null if not set). */
  mobile_host: string | null
  /** The user’s mobile number (null if not set). */
  mobile_number: string | null
  /** The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday). */
  next_week: DayId
  /** The date when the user’s Premium subscription ends (null if not a Premium user). This should be used for informational purposes only as this does not include the grace period upon expiration. As a result, avoid using this to determine whether someone has premium and use is_premium instead. */
  premium_until: string
  /** Whether to show projects in an oldest dates first order (if set to 0, or a oldest dates last order (if set to 1). */
  sort_order: Boolean
  /** The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday). */
  start_day: DayId
  /** The user’s default view on Todoist. The start page can be one of the following: _info_page for the info page, _blank for a blank page, _project_<PROJECT_ID> for project with id <PROJECT_ID>, and <ANY_QUERY> to query after anything. */
  start_page: string
  /** The id of the Team Inbox project. */
  team_inbox: number
  /** The currently selected Todoist theme (a number between 0 and 10). */
  theme: ThemeId
  /** Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1). */
  time_format: Boolean
  /** The user’s token that should be used to call the other API methods. */
  token: string
  /** The user’s timezone (a dictionary structure), which includes the following elements: the timezone as a string value, the hours and minutes difference from GMT, whether daylight saving time applies denoted by is_dst, and a string value of the time difference from GMT that is gmt_string. */
  tz_info: object
  /** The target number of tasks to complete per week. */
  weekly_goal: number
}

export interface UserUpdate {
  /** The user’s email. */
  email?: string
  /** The user’s real name formatted as Firstname Lastname. */
  full_name?: string
  /** The user’s password. */
  password?: string
  /** The user’s timezone (a string value such as UTC, Europe/Lisbon, US/Eastern, Asian/Taipei). */
  timezone?: string
  /** The user’s default view on Todoist. The start page can be one of the following: _info_page for the info page, _blank for a blank page, _project_<PROJECT_ID> for project with id <PROJECT_ID>, and <ANY_QUERY> to query after anything. */
  start_page?: string
  /** The first day of the week (between 1 and 7, where 1 is Monday and 7 is Sunday). */
  start_day?: DayId
  /** The day of the next week, that tasks will be postponed to (between 1 and 7, where 1 is Monday and 7 is Sunday). */
  next_week?: number
  /** Whether to use a 24h format such as 13:00 (if set to 0) when displaying time, or a 12h format such as 1:00pm (if set to 1). */
  time_format?: Boolean
  /** Whether to use the DD-MM-YYYY date format (if set to 0), or the MM-DD-YYYY format (if set to 1). */
  date_format?: Boolean
  /** Whether to show projects in an oldest dates first order (if set to 0, or a oldest dates last order (if set to 1). */
  sort_order?: Boolean
  /** The default reminder for the user. Reminders are only possible for Premium users. The default reminder can be one of the following: email to send reminders by email, mobile to send reminders to mobile devices via SMS, push to send reminders to smart devices using push notifications (one of the Android or iOS official clients must be installed on the client side to receive these notifications), no_default to turn off sending default reminders. */
  default_reminder?: string
  /** The default time in minutes for the automatic reminders set, whenever a due date has been specified for a task. */
  auto_reminder?: number
  /** The user’s mobile number (null if not set). */
  mobile_number?: string | null
  /** The user’s mobile host (or null if not set). */
  mobile_host?: string | null
  /** The currently selected Todoist theme (between 0 and 10). */
  theme?: ThemeId
}

export interface UserUpdateGoals {
  /** The target number of tasks to complete per day. */
  daily_goal?: number
  /** The target number of tasks to complete per week. */
  weekly_goal?: number
  /** A list with the days of the week to ignore (1 for Monday and 7 for Sunday). */
  ignore_days?: DayId
  /** Marks the user as being on vacation (where 1 is true and 0 is false). */
  vacation_mode?: Boolean
  /** Whether to disable the karma and goals measuring altogether (where 1 is true and 0 is false). */
  karma_disabled?: Boolean
}

export interface UserSettings extends NodeType {
  /** Set to true to send reminders as push notifications */
  reminder_push: boolean
  /** Set to true to send reminders via SMS */
  reminder_sms: boolean
  /** Set to true to show reminders in desktop applications */
  reminder_desktop: boolean
  /** Set to true to send reminders by email */
  reminder_email: boolean
}

export interface UserSettingsUpdate {
  /** Set to true to send reminders as push notifications */
  reminder_push: boolean
  /** Set to true to send reminders via SMS */
  reminder_sms: boolean
  /** Set to true to show reminders in desktop applications */
  reminder_desktop: boolean
  /** Set to true to send reminders by email */
  reminder_email: boolean
}

export interface Collaborator extends NodeType {
  /** The user id of the collaborator. */
  id: number
  /** The email of the collaborator. */
  email: string
  /** The full name of the collaborator. */
  full_name: string
  /** The timezone of the collaborator. */
  timezone: string
  /** The image id for the collaborator’s avatar, which can be used to get an avatar from a specific URL. Specifically the https://dcff1xvirvpfp.cloudfront.net/<image_id>_big.jpg can be used for a big (195x195 pixels) avatar, https://dcff1xvirvpfp.cloudfront.net/<image_id>_medium.jpg for a medium (60x60 pixels) avatar, and https://dcff1xvirvpfp.cloudfront.net/<image_id>_small.jpg for a small (35x35 pixels) avatar. */
  image_id: number
}

export type CollaboratorShareProject = any
export type CollaboratorDeleteCollaborator = any
export type CollaboratorAcceptInvitation = any
export type CollaboratorRejectInvitation = any
export type CollaboratorDeleteInvitation = any

/** share_invitation_sent	Sent to the sharing invitation receiver. */
/** share_invitation_accepted	Sent to the sharing invitation sender, when the receiver accepts the invitation. */
/** share_invitation_rejected	Sent to the sharing invitation sender, when the receiver rejects the invitation. */
/** user_left_project	Sent to everyone when somebody leaves the project. */
/** user_removed_from_project	Sent to everyone, when a person removes somebody from the project. */
/** item_assigned	Sent to user who is responsible for the task. Optionally it’s also sent to the user who created the task initially, if the assigner and the task creator is not the same person. */
/** item_completed	Sent to the user who assigned the task when the task is completed. Optionally it’s also sent to the user who is responsible for this task, if the responsible user and the user who completed the task is not the same person. */
/** item_uncompleted	Sent to the user who assigned the task when the task is uncompleted. Optionally it’s also sent to the user who is responsible for this task, if the responsible user and the user who completed the task is not the same person. */
/** note_added	Sent to all members of the shared project, whenever someone adds a note to the task. */
/** biz_policy_disallowed_invitation	Sent to you when you try to share a project with someone outside of your business account, but the business account policy disallows this action. */
/** biz_policy_rejected_invitation	Sent to you when you try to accept the invitation to a shared project from someone outside of your business account, but the business account policy disallows this action. */
/** biz_trial_will_end	Sent to all business account administrators three days before the trial period of a subscription is scheduled to end. */
/** biz_payment_failed	Sent to all business account administrators whenever an invoice attempt payment fails. This can occur either due to a declined payment, or because the customer has no active card. A particular case of note is that if a customer with no active card reaches the end of its free trial. */
/** biz_account_disabled	Sent to all business account administrators when the account is disabled. */
/** biz_invitation_created	Sent to an invitee, when one of business account administrators invites this user to the business account. */
/** biz_invitation_accepted	Sent to an inviter, when the invitation is accepted. */
/** biz_invitation_rejected	Sent to an inviter, when the invitation is rejected. */
export interface LiveNotifications extends NodeType {
  /** The id of the live notification. */
  id: number
  /** The legacy id of the live notification. */
  /** (only shown for objects created before 1 April 2017) */
  legacy_id?: number
  /** Live notification creation date. A number representing a timestamp since epoch. */
  created: number
  /** The id of the user who initiated this live notification. */
  from_uid: number
  /** Unique notification key. */
  notification_key: string
  /** Type of notification. Different notification type define different extra fields which are described below. */
  notification_type: string
  /** Notification sequence number. */
  seq_no: number
  /** Whether the notification is marked as unread (1) or read (0). */
  is_unread: Boolean
}

export type LiveNotificationsSetLastRead = any
export type LiveNotificationsMarkRead = any
export type LiveNotificationsMarkReadAll = any
export type LiveNotificationsMarkUnread = any

/** Specific properties */
/** Here are the extra properties for the *_invitation_* types of live notifications: */

/** Property	Description */
/** from_user */
/** Object */
/** User data, useful on share_invitation_sent. */
/** project_name */
/** String */
/** The project name, useful for share_invitation_* where you may not have the project in the local model. */
/** invitation_id */
/** Integer */
/** The invitation id. Useful for accepting/rejecting invitations. */
/** invitation_secret */
/** String */
/** The invitation secret key. Useful for accepting/rejecting invitations. */
/** Here are the extra properties for the share_invitation_sent type of live notifications: */

/** Property	Description */
/** state */
/** String */
/** Invitation state. Initially invited, can change the state to accepted or rejected. */
/** Here are the extra properties for the user_removed_from_project type of live notifications: */

/** Property	Description */
/** removed_name */
/** String */
/** The name of the user removed. */
/** removed_uid */
/** Integer */
/** The uid of the user removed. */
/** Here are the extra properties for the biz_trial_will_end type of live notifications: */

/** Property	Description */
/** quantity */
/** Integer */
/** The number of users under the control of the business account. */
/** plan */
/** String */
/** Tariff plan name. Valid values are business_monthly and business_yearly. */
/** active_until */
/** Integer */
/** The timestamp when the business account will be disabled. The value may not match the business account subscription end date, as we give some extra days (up to two weeks) to pay the invoice. */
/** Here are the extra properties for the biz_payment_failed type of live notifications: */

/** Property	Description */
/** quantity */
/** Integer */
/** The number of users under the control of the business account. */
/** plan */
/** String */
/** Tariff plan name. Valid values are business_monthly and business_yearly. */
/** active_until */
/** Integer */
/** The timestamp when the business account will be disabled. The value may not match the business account subscription end date, as we give some extra days (up to two weeks) to pay the invoice. */
/** amount_due */
/** Integer */
/** Invoice amount. Integer value in 0.01 of currency. */
/** attempt_count */
/** Integer */
/** Number of automatic payment attempts made for this invoice. */
/** currency */
/** String */
/** Currency value. Three-letter ISO currency code representing the currency in which the charge was made. */
/** description */
/** String */
/** Invoice description. */
/** next_payment_attempt */
/** String */
/** Timestamp value. */
/** Here are the extra properties for the biz_account_disabled type of live notifications: */

/** Property	Description */
/** quantity */
/** Integer */
/** The number of users under the control of the business account. */
/** plan */
/** String */
/** Tariff plan name. Valid values are business_monthly and business_yearly. */
/** active_until */
/** Integer */
/** The timestamp when the business account will be disabled. The value may not match the business account subscription end date, as we give some extra days (up to two weeks) to pay the invoice. */
/** Here are the extra properties for the biz_invitation_created type of live notifications: */

/** Property	Description */
/** state */
/** String */
/** Invitation state. Initially invited, can change the state to accepted or rejected. */
/** invitation_secret */
/** String */
/** Invitation secret. Should be used to accept or reject invitation. */
/** invitation_message */
/** String */
/** Invitation message. */
/** account_name */
/** String */
/** Business account (company) name. */
