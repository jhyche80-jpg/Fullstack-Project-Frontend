export type Status = 'in-progress' | 'completed' | 'notStarted'
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
    project: string | { _id: string; title: string; description: string }
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
    projectId: string
}
export interface TaskListProps {
    tasks: Task[];
    onChange: (projectId: string, taskId: string, updatedtask: Task) => void;
    onDelete: (projectId: string, taskId: string) => void;
}

//Task Item 
export interface TaskItemProps {
    task: Task;
    onChange: (projectId: string, taskId: string, updatedtask: Task) => void;
    onDelete: (projectId: string, taskId: string) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}



export interface Counter {
    Name: string;
    Pending: number;
    Completed: number;
    Total: number;
    InProgress: number;

}

