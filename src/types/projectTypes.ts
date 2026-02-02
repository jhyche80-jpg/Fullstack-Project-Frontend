import type React from "react";

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
    dueDate?: string
}
export interface createProjectProps {
    projects: Project[]
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}
export interface ProjectListProps {
    projects: Project[]
    onChange: (projectId: string, updatedProject: Project) => void;
    onDelete: (projectId: string) => void;
}
export interface ProjectItem {
    project: Project
    onChange: (projectId: string, updatedProject: Project) => void;
    onDelete: (projectId: string) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>

}
export interface TaskItemProps {
    Project: Project;
    onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
    onEdit: (projectId: string, newData: CreateProjectDTO) => void
    onDelete: (projectid: string) => void;

}