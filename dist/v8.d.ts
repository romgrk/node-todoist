import * as Types from './v8-types';
export interface State {
    collaborator_states: Types.NodeType[];
    collaborators: Types.Collaborator[];
    day_orders_timestamp: string;
    day_orders: Types.NodeType[];
    due_exceptions: Types.NodeType[];
    filters: Types.Filter[];
    incomplete_item_ids: Types.NodeType[];
    incomplete_project_ids: Types.NodeType[];
    items: Types.Item[];
    labels: Types.Label[];
    live_notifications_last_read_id: number;
    live_notifications: Types.LiveNotifications[];
    locations: Types.NodeType[];
    notes: Types.Note[];
    project_notes: Types.ProjectNote[];
    projects: Types.Project[];
    reminders: Types.Reminder[];
    sections: Types.Section[];
    stats: Types.NodeType[];
    tooltips: Types.NodeType[];
    user_settings: Types.UserSettings | null;
    user: Types.User | null;
    temp_id_mapping: Record<string, number>;
}
declare type TodoistResponse = {
    sync_status: Record<string, string & {
        error_tag: string;
        error: string;
    }>;
    temp_id_mapping: Record<string, number>;
    sync_token: string;
    full_sync: boolean;
} & State;
export declare type UpdateableProperties = 'collaborators' | 'collaborator_states' | 'due_exceptions' | 'filters' | 'items' | 'labels' | 'live_notifications' | 'notes' | 'project_notes' | 'projects' | 'reminders' | 'sections';
declare const defaultOptions: {
    endpoint: string;
    resourceTypes: string[];
    autocommit: boolean;
};
export declare type TodoistOptions = typeof defaultOptions;
/**
 * Create a Todoist API instance
 */
export declare const Todoist: {
    (token: string, userOptions?: {
        endpoint: string;
        resourceTypes: string[];
        autocommit: boolean;
    }): {
        activityLog: {
            get: (options: any) => Promise<TodoistResponse>;
        };
        completedItems: {
            get: (opts: any) => Promise<Types.Item[]>;
        };
        backup: {};
        business: {};
        colorsById: Record<Types.ColorId, string>;
        commit: () => void;
        email: {};
        filters: {
            get: () => Types.Filter[];
            add: (args: Types.FilterAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.FilterUpdate) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.FilterDelete) => Promise<Types.NodeType | undefined>;
            updateOrders: (args: Types.FilterUpdateOrders) => Promise<Types.NodeType | undefined>;
        };
        items: {
            get: () => Types.Item[];
            add: (args: Types.ItemAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.ItemUpdate) => Promise<Types.NodeType | undefined>;
            move: (args: Types.ItemMove) => Promise<Types.NodeType | undefined>;
            reorder: (args: Types.ItemReorder) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.ItemDelete) => Promise<Types.NodeType | undefined>;
            close: (args: Types.ItemClose) => Promise<Types.NodeType | undefined>;
            complete: (args: Types.ItemComplete) => Promise<Types.NodeType | undefined>;
            uncomplete: (args: Types.ItemUncomplete) => Promise<Types.NodeType | undefined>;
            archive: (args: Types.ItemArchive) => Promise<Types.NodeType | undefined>;
            unarchive: (args: Types.ItemUnarchive) => Promise<Types.NodeType | undefined>;
            updateDayOrders: (args: Types.ItemUpdateDayOrders) => Promise<Types.NodeType | undefined>;
            updateDateCompleted: (args: Types.ItemUpdateDateComplete) => Promise<Types.NodeType | undefined>;
        };
        labels: {
            get: () => Types.Label[];
            add: (args: Types.LabelAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.LabelUpdate) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.LabelDelete) => Promise<Types.NodeType | undefined>;
            updateOrders: (args: Types.LabelUpdateOrders) => Promise<Types.NodeType | undefined>;
        };
        liveNotifications: {
            setLastRead: (args: any) => Promise<Types.NodeType | undefined>;
            markAsRead: (args: any) => Promise<Types.NodeType | undefined>;
            markAllAsRead: (args: any) => Promise<Types.NodeType | undefined>;
            markAsUnread: (args: any) => Promise<Types.NodeType | undefined>;
        };
        notes: {
            get: () => Types.Note[];
            add: (args: Types.NoteAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.NoteUpdate) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.NoteDelete) => Promise<Types.NodeType | undefined>;
        };
        projects: {
            get: () => Types.Project[];
            add: (args: Types.ProjectAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.ProjectUpdate) => Promise<Types.NodeType | undefined>;
            move: (args: Types.ProjectMove) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.ProjectDelete) => Promise<Types.NodeType | undefined>;
            archive: (args: Types.ProjectArchive) => Promise<Types.NodeType | undefined>;
            unarchive: (args: Types.ProjectUnarchive) => Promise<Types.NodeType | undefined>;
            reorder: (args: Types.ProjectReorder) => Promise<Types.NodeType | undefined>;
        };
        projectNotes: {
            get: () => Types.ProjectNote[];
            add: (args: Types.ProjectNoteAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.ProjectNoteUpdate) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.ProjectNoteDelete) => Promise<Types.NodeType | undefined>;
        };
        reminders: {
            get: () => Types.Reminder[];
            add: (args: Types.ReminderAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.ReminderUpdate) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.ReminderDelete) => Promise<Types.NodeType | undefined>;
            clearLocations: (args: Types.ReminderClearLocations) => Promise<Types.NodeType | undefined>;
        };
        sections: {
            get: () => Types.Section[];
            add: (args: Types.SectionAdd) => Promise<Types.NodeType | undefined>;
            update: (args: Types.SectionUpdate) => Promise<Types.NodeType | undefined>;
            move: (args: Types.SectionMove) => Promise<Types.NodeType | undefined>;
            reorder: (args: Types.SectionReorder) => Promise<Types.NodeType | undefined>;
            delete: (args: Types.SectionDelete) => Promise<Types.NodeType | undefined>;
            archive: (args: Types.SectionArchive) => Promise<Types.NodeType | undefined>;
            unarchive: (args: Types.SectionUnarchive) => Promise<Types.NodeType | undefined>;
        };
        settings: {
            get: () => Types.UserSettings | null;
            update: (args: Types.UserSettingsUpdate) => Promise<Types.NodeType | undefined>;
        };
        sharing: {
            collaborators: () => Types.Collaborator[];
            shareProject: (args: any) => Promise<Types.NodeType | undefined>;
            deleteCollaborator: (args: any) => Promise<Types.NodeType | undefined>;
            acceptInvitation: (args: any) => Promise<Types.NodeType | undefined>;
            rejectInvitation: (args: any) => Promise<Types.NodeType | undefined>;
            deleteInvitation: (args: any) => Promise<Types.NodeType | undefined>;
        };
        state: State;
        sync: (resourceTypes?: string[]) => Promise<void>;
        user: {
            get: () => Types.User | null;
            update: (args: Types.UserUpdate) => Promise<Types.NodeType | undefined>;
            updateGoals: (args: Types.UserUpdateGoals) => Promise<Types.NodeType | undefined>;
        };
        syncToken: {
            get: () => string;
            set: (newToken: string) => void;
        };
    };
    colorsById: Record<Types.ColorId, string>;
    getColor(id: Types.ColorId): string;
};
export default Todoist;
