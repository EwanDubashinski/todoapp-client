// export type ProjectData = {
//     "child_order": number | null,     // "child_order": 0,
//     "collapsed": number | null,       // "collapsed": 0,
//     "color": number | null,           // "color": 48,
//     "has_more_notes": boolean | null, // "has_more_notes": false,
//     "id": number,                     // "id": 377479470,
//     "inbox_project": boolean,         // "inbox_project": true,
//     "is_archived": number | null,     // "is_archived": 0,
//     "is_deleted": number | null,      // "is_deleted": 0,
//     "is_favorite": number | null,     // "is_favorite": 0,
//     "legacy_id": number | undefined,  // "legacy_id": 109044014,
//     "name": string,                   // "name": "Inbox",
//     "parent_id": number | null,       // "parent_id": null,
//     "shared": boolean | null,         // "shared": false,
//     "sync_id": any | null             // "sync_id": null
// };

export type ProjectData = {
    childOrder: number,
    collapsed?: number,
    color?: number,
    has_more_notes?: boolean,
    // id: number | string,
    id: number,
    // id?: number,
    inbox_project?: boolean | null,
    is_archived?: number,
    is_deleted?: number,
    is_favorite?: number,
    legacy_id?: number | null,
    name?: string,
    parentId?: number | null,
    shared?: boolean,
    sync_id?: number | null,
    legacy_parent_id?: number | null,
}

export type TaskData = {
    added_by_uid?: number | null;
    assigned_by_uid?: number | null;
    checked: number;
    childOrder?: number;
    collapsed?: number;
    content: string;
    date_added: string;
    dateCompleted?: null;
    day_order?: number;
    due?: Due | null;
    has_more_notes?: boolean;
    id: number;
    in_history?: number;
    is_deleted?: number;
    labels?: (null)[] | null;
    parentId?: number | null;
    priority?: number;
    projectId: number;
    responsible_uid?: null;
    section_id?: null;
    sync_id?: number | null;
    user_id?: number;
    legacy_project_id?: number | null;
    legacy_parent_id?: number | null;
}

export type Due = {
    date: string;
    is_recurring: boolean;
    lang: string;
    string: string;
    timezone?: null;
}

export type UserData = {
    authorities?: (AuthoritiesEntity)[] | null;
    details: Details;
    authenticated: boolean;
    principal: Principal;
    credentials?: null;
    name: string;
}
export interface AuthoritiesEntity {
    authority: string;
}
export interface Details {
    remoteAddress: string;
    sessionId?: null;
}
export interface Principal {
    password?: null;
    username: string;
    authorities?: (AuthoritiesEntity)[] | null;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}
