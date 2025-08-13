export interface Task {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Tasks {
    tasks: Task[]
}
