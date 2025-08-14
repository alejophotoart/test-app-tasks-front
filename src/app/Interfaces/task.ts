export interface Task {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface Tasks {
    tasks: Task[]
}
