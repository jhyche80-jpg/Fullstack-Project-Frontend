import { useEffect } from "react"
export type Status = 'pending' | 'in-progress' | 'completed'
export type TaskPrio = 'low' | 'medium' | 'high'


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
    _id: string;
    title: string;
    dueDate: string;
    user: string
    description: string;
    project: string
    status: Status;
    priority: TaskPrio;

}
export interface CreateTaskDTO {
    title: string;
    dueDate: string;
    description: string;
    status: Status;
    priority: TaskPrio;
}


export interface CreateTaskProps {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
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
        dueDate?: string
    }) => void;
}
export type Filters = {
    status?: Status;
    priority?: TaskPrio;
    dueDate?: string
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
