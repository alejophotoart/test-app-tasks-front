export interface Task {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    sync_status: 'synced' | 'pending_create' | 'pending_update' | 'pending_delete';
    type: 'create' | 'update';
    _id: string;
    created_at: string;
    updated_at: string;
}

export interface TaskResponse {
    error: boolean,
    msg: string,
    task: Task
}
// export interface Tasks {
//     tasks: Task[]
//     msg: string
// }
