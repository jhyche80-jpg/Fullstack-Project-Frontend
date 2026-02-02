import { api } from "../../services/axios";
import type { CreateProjectDTO, Project } from "../../types/projectTypes";

export async function getProjects(): Promise<Project[]> {
    const { data } = await api.get("/projects");
    return data;
}

export async function createProject(formData: CreateProjectDTO): Promise<Project> {
    const { data } = await api.post<Project>("/projects", formData);
    return data;
}

export async function deleteProject(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
}

export async function updateProject(
    id: string,
    formData: Partial<CreateProjectDTO>
): Promise<Project> {
    const { data } = await api.put(`/projects/${id}`, formData);
    return data;
}