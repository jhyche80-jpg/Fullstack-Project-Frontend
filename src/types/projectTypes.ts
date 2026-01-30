export type ProjectStatus = "in-progress" | "completed" | "notStarted";
export interface Project {
    _id: string
    title: string
    dueDate?: string
    description: string
    status: ProjectStatus
    user: string
}

export interface CreateProjectDTO {
    title: string;
    description: string;
    status: ProjectStatus;
    dueDate?: string;
}