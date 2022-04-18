import * as TodoistV8Types from './v8-types';
export declare const Todoist: {
    (token: string, userOptions?: {
        endpoint: string;
        resourceTypes: string[];
        autocommit: boolean;
    }): {
        activityLog: {
            get: (options: any) => Promise<{
                sync_status: Record<string, string & {
                    error_tag: string;
                    error: string;
                }>;
                temp_id_mapping: Record<string, number>;
                sync_token: string;
                full_sync: boolean;
            } & import("./v8").State>;
        };
        completedItems: {
            get: (opts: any) => Promise<TodoistV8Types.Item[]>;
        };
        backup: {};
        business: {};
        colorsById: Record<TodoistV8Types.ColorId, string>;
        commit: () => void;
        email: {};
        filters: {
            get: () => TodoistV8Types.Filter[];
            add: (args: TodoistV8Types.FilterAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.FilterUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.FilterDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            updateOrders: (args: TodoistV8Types.FilterUpdateOrders) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        items: {
            get: () => TodoistV8Types.Item[];
            add: (args: TodoistV8Types.ItemAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ItemUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.ItemMove) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.ItemReorder) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ItemDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            close: (args: TodoistV8Types.ItemClose) => Promise<TodoistV8Types.NodeType | undefined>;
            complete: (args: TodoistV8Types.ItemComplete) => Promise<TodoistV8Types.NodeType | undefined>;
            uncomplete: (args: TodoistV8Types.ItemUncomplete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.ItemArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.ItemUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
            updateDayOrders: (args: TodoistV8Types.ItemUpdateDayOrders) => Promise<TodoistV8Types.NodeType | undefined>;
            updateDateCompleted: (args: TodoistV8Types.ItemUpdateDateComplete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        labels: {
            get: () => TodoistV8Types.Label[];
            add: (args: TodoistV8Types.LabelAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.LabelUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.LabelDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            updateOrders: (args: TodoistV8Types.LabelUpdateOrders) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        liveNotifications: {
            setLastRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAsRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAllAsRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAsUnread: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        notes: {
            get: () => TodoistV8Types.Note[];
            add: (args: TodoistV8Types.NoteAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.NoteUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.NoteDelete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        projects: {
            get: () => TodoistV8Types.Project[];
            add: (args: TodoistV8Types.ProjectAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ProjectUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.ProjectMove) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ProjectDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.ProjectArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.ProjectUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.ProjectReorder) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        projectNotes: {
            get: () => TodoistV8Types.ProjectNote[];
            add: (args: TodoistV8Types.ProjectNoteAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ProjectNoteUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ProjectNoteDelete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        reminders: {
            get: () => TodoistV8Types.Reminder[];
            add: (args: TodoistV8Types.ReminderAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ReminderUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ReminderDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            clearLocations: (args: TodoistV8Types.ReminderClearLocations) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        sections: {
            get: () => TodoistV8Types.Section[];
            add: (args: TodoistV8Types.SectionAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.SectionUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.SectionMove) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.SectionReorder) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.SectionDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.SectionArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.SectionUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        settings: {
            get: () => TodoistV8Types.UserSettings | null;
            update: (args: TodoistV8Types.UserSettingsUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        sharing: {
            collaborators: () => TodoistV8Types.Collaborator[];
            shareProject: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            deleteCollaborator: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            acceptInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            rejectInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            deleteInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        state: import("./v8").State;
        sync: (resourceTypes?: string[]) => Promise<void>;
        user: {
            get: () => TodoistV8Types.User | null;
            update: (args: TodoistV8Types.UserUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            updateGoals: (args: TodoistV8Types.UserUpdateGoals) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        syncToken: {
            get: () => string;
            set: (newToken: string) => void;
        };
    };
    colorsById: Record<TodoistV8Types.ColorId, string>;
    getColor(id: TodoistV8Types.ColorId): string;
};
export declare const v8: {
    (token: string, userOptions?: {
        endpoint: string;
        resourceTypes: string[];
        autocommit: boolean;
    }): {
        activityLog: {
            get: (options: any) => Promise<{
                sync_status: Record<string, string & {
                    error_tag: string;
                    error: string;
                }>;
                temp_id_mapping: Record<string, number>;
                sync_token: string;
                full_sync: boolean;
            } & import("./v8").State>;
        };
        completedItems: {
            get: (opts: any) => Promise<TodoistV8Types.Item[]>;
        };
        backup: {};
        business: {};
        colorsById: Record<TodoistV8Types.ColorId, string>;
        commit: () => void;
        email: {};
        filters: {
            get: () => TodoistV8Types.Filter[];
            add: (args: TodoistV8Types.FilterAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.FilterUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.FilterDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            updateOrders: (args: TodoistV8Types.FilterUpdateOrders) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        items: {
            get: () => TodoistV8Types.Item[];
            add: (args: TodoistV8Types.ItemAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ItemUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.ItemMove) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.ItemReorder) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ItemDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            close: (args: TodoistV8Types.ItemClose) => Promise<TodoistV8Types.NodeType | undefined>;
            complete: (args: TodoistV8Types.ItemComplete) => Promise<TodoistV8Types.NodeType | undefined>;
            uncomplete: (args: TodoistV8Types.ItemUncomplete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.ItemArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.ItemUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
            updateDayOrders: (args: TodoistV8Types.ItemUpdateDayOrders) => Promise<TodoistV8Types.NodeType | undefined>;
            updateDateCompleted: (args: TodoistV8Types.ItemUpdateDateComplete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        labels: {
            get: () => TodoistV8Types.Label[];
            add: (args: TodoistV8Types.LabelAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.LabelUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.LabelDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            updateOrders: (args: TodoistV8Types.LabelUpdateOrders) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        liveNotifications: {
            setLastRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAsRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAllAsRead: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            markAsUnread: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        notes: {
            get: () => TodoistV8Types.Note[];
            add: (args: TodoistV8Types.NoteAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.NoteUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.NoteDelete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        projects: {
            get: () => TodoistV8Types.Project[];
            add: (args: TodoistV8Types.ProjectAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ProjectUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.ProjectMove) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ProjectDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.ProjectArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.ProjectUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.ProjectReorder) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        projectNotes: {
            get: () => TodoistV8Types.ProjectNote[];
            add: (args: TodoistV8Types.ProjectNoteAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ProjectNoteUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ProjectNoteDelete) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        reminders: {
            get: () => TodoistV8Types.Reminder[];
            add: (args: TodoistV8Types.ReminderAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.ReminderUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.ReminderDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            clearLocations: (args: TodoistV8Types.ReminderClearLocations) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        sections: {
            get: () => TodoistV8Types.Section[];
            add: (args: TodoistV8Types.SectionAdd) => Promise<TodoistV8Types.NodeType | undefined>;
            update: (args: TodoistV8Types.SectionUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            move: (args: TodoistV8Types.SectionMove) => Promise<TodoistV8Types.NodeType | undefined>;
            reorder: (args: TodoistV8Types.SectionReorder) => Promise<TodoistV8Types.NodeType | undefined>;
            delete: (args: TodoistV8Types.SectionDelete) => Promise<TodoistV8Types.NodeType | undefined>;
            archive: (args: TodoistV8Types.SectionArchive) => Promise<TodoistV8Types.NodeType | undefined>;
            unarchive: (args: TodoistV8Types.SectionUnarchive) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        settings: {
            get: () => TodoistV8Types.UserSettings | null;
            update: (args: TodoistV8Types.UserSettingsUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        sharing: {
            collaborators: () => TodoistV8Types.Collaborator[];
            shareProject: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            deleteCollaborator: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            acceptInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            rejectInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
            deleteInvitation: (args: any) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        state: import("./v8").State;
        sync: (resourceTypes?: string[]) => Promise<void>;
        user: {
            get: () => TodoistV8Types.User | null;
            update: (args: TodoistV8Types.UserUpdate) => Promise<TodoistV8Types.NodeType | undefined>;
            updateGoals: (args: TodoistV8Types.UserUpdateGoals) => Promise<TodoistV8Types.NodeType | undefined>;
        };
        syncToken: {
            get: () => string;
            set: (newToken: string) => void;
        };
    };
    colorsById: Record<TodoistV8Types.ColorId, string>;
    getColor(id: TodoistV8Types.ColorId): string;
};
export { TodoistV8Types };
