import got from 'got';
import { v4 } from 'uuid';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/*
 * index.js
 */
var stringify = JSON.stringify;
var BASE = 'https://api.todoist.com/sync/v8';
var COLORS_BY_ID = {
    30: '#b8256f',
    31: '#db4035',
    32: '#ff9933',
    33: '#fad000',
    34: '#afb83b',
    35: '#7ecc49',
    36: '#299438',
    37: '#6accbc',
    38: '#158fad',
    39: '#14aaf5',
    40: '#96c3eb',
    41: '#4073ff',
    42: '#884dff',
    43: '#af38eb',
    44: '#eb96eb',
    45: '#e05194',
    46: '#ff8d85',
    47: '#808080',
    48: '#b8b8b8',
    49: '#ccac93',
};
var ARRAY_KEYS = [
    'collaborators',
    'collaborator_states',
    'due_exceptions',
    'filters',
    'items',
    'labels',
    'live_notifications',
    'notes',
    'project_notes',
    'projects',
    'reminders',
    'sections',
];
var defaultOptions = {
    endpoint: BASE,
    resourceTypes: ['all'],
    autocommit: false,
};
/**
 * Create a Todoist API instance
 */
var Todoist = function (token, userOptions) {
    if (userOptions === void 0) { userOptions = defaultOptions; }
    if (!/^[0-9A-Fa-f]{40}$/.test(token))
        throw new Error("Invalid API token. A token should be 40 characters long and exist of hexadecimals, was " + token + " (" + token.length + " characters)");
    var options = Object.assign({}, defaultOptions, userOptions);
    var client = got.extend({ method: 'POST', responseType: 'json' });
    var endpoint = options.endpoint + "/sync";
    var syncToken = '*';
    var state = {
        collaborator_states: [],
        collaborators: [],
        day_orders_timestamp: '',
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
        temp_id_mapping: {},
        tooltips: [],
        user_settings: null,
        user: null,
    };
    var updateState = function (patch) {
        syncToken = patch.sync_token;
        /* Case 1: full_sync: replace whole state */
        if (patch.full_sync) {
            Object.assign(state, patch);
            return;
        }
        var updateItem = function (key) {
            var items = state[key];
            var newItems = patch[key];
            var newItemIds = newItems.map(function (item) { return item.id; });
            var updatedItems = items
                // remove items that are not found in the result set
                .filter(function (item) { return !newItemIds.includes(item.id); })
                // add items from the result set
                .concat(newItems.filter(function (item) { return !item.is_deleted; }));
            state[key] = updatedItems;
        };
        /* Case 2: need to replace part of the state that changed */
        ARRAY_KEYS.forEach(updateItem);
    };
    var request = function (url, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var realUrl, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        realUrl = typeof url === 'object' ? url.url : url;
                        options = typeof url === 'object' ? { searchParams: url.query, form: __assign({ token: token }, data) } : { form: __assign({ token: token }, data) };
                        return [4 /*yield*/, client(realUrl, options)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                }
            });
        });
    };
    /**
     * @param {string} type - The type of resource
     * @param {string|Action} action - The name of the action
     * @param {Object} args - The arguments of the command
     * @returns {Promise}
     */
    var executeCommand = function (type, action, args) {
        if (args === void 0) { args = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var id, tempId, command, data, res, ok, status_1, error, newId, stateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = v4();
                        tempId = v4();
                        command = {
                            type: type + "_" + action,
                            args: args,
                            uuid: id,
                            temp_id: tempId,
                        };
                        data = {
                            sync_token: syncToken,
                            resource_types: stringify(options.resourceTypes),
                            commands: stringify([command]),
                        };
                        return [4 /*yield*/, request({ url: endpoint }, data)];
                    case 1:
                        res = _a.sent();
                        ok = res.sync_status[id] === 'ok';
                        if (!ok) {
                            status_1 = res.sync_status[id];
                            error = new Error(status_1.error_tag + ": " + status_1.error);
                            return [2 /*return*/, Promise.reject(error)];
                        }
                        newId = res.temp_id_mapping[tempId];
                        updateState(res);
                        stateKey = type + "s";
                        return [2 /*return*/, state[stateKey].find(function (item) { return item.id === newId; })];
                }
            });
        });
    };
    var createCommand = function (type, action) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, executeCommand(type, action, args)];
        }); }); };
    };
    var sync = function (resourceTypes) {
        if (resourceTypes === void 0) { resourceTypes = options.resourceTypes; }
        return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request({ url: endpoint }, {
                            sync_token: syncToken,
                            resource_types: stringify(resourceTypes),
                        })];
                    case 1:
                        res = _a.sent();
                        updateState(res);
                        return [2 /*return*/];
                }
            });
        });
    };
    function commit() {
        // TODO: implement
    }
    // API
    var projects = {
        get: function () { return state.projects; },
        add: createCommand('project', 'add'),
        update: createCommand('project', 'update'),
        move: createCommand('project', 'move'),
        delete: createCommand('project', 'delete'),
        archive: createCommand('project', 'archive'),
        unarchive: createCommand('project', 'unarchive'),
        reorder: createCommand('project', 'reorder'),
    };
    var items = {
        get: function () { return state.items; },
        add: createCommand('item', 'add'),
        update: createCommand('item', 'update'),
        move: createCommand('item', 'move'),
        reorder: createCommand('item', 'reorder'),
        delete: createCommand('item', 'delete'),
        close: createCommand('item', 'close'),
        complete: createCommand('item', 'complete'),
        uncomplete: createCommand('item', 'uncomplete'),
        archive: createCommand('item', 'archive'),
        unarchive: createCommand('item', 'unarchive'),
        updateDayOrders: createCommand('item', 'update_day_orders'),
        updateDateCompleted: createCommand('item', 'update_date_complete'),
    };
    var labels = {
        get: function () { return state.labels; },
        add: createCommand('label', 'add'),
        update: createCommand('label', 'update'),
        delete: createCommand('label', 'delete'),
        updateOrders: createCommand('label', 'update_orders'),
    };
    var notes = {
        get: function () { return state.notes; },
        add: createCommand('note', 'add'),
        update: createCommand('note', 'update'),
        delete: createCommand('note', 'delete'),
    };
    var projectNotes = {
        get: function () { return state.project_notes; },
        add: createCommand('project_note', 'add'),
        update: createCommand('project_note', 'update'),
        delete: createCommand('project_note', 'delete'),
    };
    var sections = {
        get: function () { return state.sections; },
        add: createCommand('section', 'add'),
        update: createCommand('section', 'update'),
        move: createCommand('section', 'move'),
        reorder: createCommand('section', 'reorder'),
        delete: createCommand('section', 'delete'),
        archive: createCommand('section', 'archive'),
        unarchive: createCommand('section', 'unarchive'),
    };
    var filters = {
        get: function () { return state.filters; },
        add: createCommand('filter', 'add'),
        update: createCommand('filter', 'update'),
        delete: createCommand('filter', 'delete'),
        updateOrders: createCommand('filter', 'update_orders'),
    };
    var reminders = {
        get: function () { return state.reminders; },
        add: createCommand('reminder', 'add'),
        update: createCommand('reminder', 'update'),
        delete: createCommand('reminder', 'delete'),
        clearLocations: createCommand('reminder', 'clear_locations'),
    };
    var user = {
        get: function () { return state.user; },
        update: createCommand('user', 'update'),
        updateGoals: createCommand('user', 'update_goals'),
    };
    var settings = {
        get: function () { return state.user_settings; },
        update: createCommand('user_settings', 'update'),
    };
    var sharing = {
        collaborators: function () { return state.collaborators; },
        shareProject: createCommand('collaborator', 'share_project'),
        deleteCollaborator: createCommand('collaborator', 'delete_collaborator'),
        acceptInvitation: createCommand('collaborator', 'accept_invitation'),
        rejectInvitation: createCommand('collaborator', 'reject_invitation'),
        deleteInvitation: createCommand('collaborator', 'delete_invitation'),
    };
    var liveNotifications = {
        setLastRead: createCommand('live_notifications', 'set_last_read'),
        markAsRead: createCommand('live_notifications', 'mark_read'),
        markAllAsRead: createCommand('live_notifications', 'mark_read_all'),
        markAsUnread: createCommand('live_notifications', 'mark_unread'),
    };
    var business = {
    // TODO: implement
    };
    var activityLog = {
        get: function (options) { return request({ url: options.endpoint + "/activity/get", query: options }); },
    };
    var completedItems = {
        get: function (opts) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request({
                            url: options.endpoint + "/completed/get_all",
                            query: opts
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.items];
                }
            });
        }); }
    };
    var backup = {
    // TODO: implement
    };
    var email = {
    // TODO: implement
    };
    var syncToken_ = {
        get: function () { return syncToken; },
        set: function (newToken) {
            syncToken = newToken;
        },
    };
    var api = {
        activityLog: activityLog,
        completedItems: completedItems,
        backup: backup,
        business: business,
        colorsById: COLORS_BY_ID,
        commit: commit,
        email: email,
        filters: filters,
        items: items,
        labels: labels,
        liveNotifications: liveNotifications,
        notes: notes,
        projects: projects,
        projectNotes: projectNotes,
        reminders: reminders,
        sections: sections,
        settings: settings,
        sharing: sharing,
        state: state,
        sync: sync,
        user: user,
        syncToken: syncToken_,
    };
    return api;
};
Todoist.colorsById = COLORS_BY_ID;
Todoist.getColor = function (id) { return COLORS_BY_ID[id]; };

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

var v8Types = /*#__PURE__*/Object.freeze({
    __proto__: null
});

// export V8 as the current version
var Todoist$1 = Todoist;
// create backwards compatibility list
var v8 = Todoist;

export { Todoist$1 as Todoist, v8Types as TodoistV8Types, v8 };
//# sourceMappingURL=index.es.js.map
