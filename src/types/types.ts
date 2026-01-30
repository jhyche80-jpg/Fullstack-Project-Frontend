import { useEffect } from "react"

export type Status = 'pending' | 'in-progress' | 'completed'
export type TaskCat = 'school' | 'work' | 'personal' | 'fitness' | 'finance' | 'other'
export type TaskPrio = 'low' | 'medium' | 'high'

export interface Register {
    username: string
    email: string
    password: string
    birthdate: Date
    firstName: string
    lastName: string
}

export interface Login {
    username: string
    password: string
}
export interface Dashboard {
    pending: number;
    running: number;
    total: number;
    ended: number;

}


export interface ChartProps {
    labels: string[];
    values: number[]
}
export interface Taskcount {

    TaskPending: number,
    TaskCompleted: number,
    TaskTotal: number,
    TaskInProgress: number,
    TaskTotalCompleted: number

}
export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: TaskPrio;
    dueDate: string;
    time: string;
    category: TaskCat
}

export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: Status) => void;
    onDelete: (taskId: string) => void;
}

//Task Item 
export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: Status) => void;
    onDelete: (taskId: string) => void;

}

// Task Filter 
export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: Status;
        priority?: TaskPrio;
        category: TaskCat
    }) => void;
}
export type Filters = {
    status?: Status;
    priority?: TaskPrio;
    category?: TaskCat;
    search?: string;
}
export function useSave<T>(key: string, value: T) {
    useEffect(() => {
        if (value === undefined) return;

        const valueToStore =
            typeof value === "object"
                ? JSON.stringify(value)
                : String(value);

        localStorage.setItem(key, valueToStore);
    }, [key, value]);
}
