import type { CreateTaskDTO, Task } from "../../types/types"
import { api } from "../../services/axios"


export async function getTask(projectId: string): Promise<Task[]> {
    const { data } = await api.get(`/projects/${projectId}/tasks`)
    return data

}
export async function createTask(projectId: string, taskData: CreateTaskDTO): Promise<Task> {
    const { data } = await api.post<Task>(`/projects/${projectId}/tasks`, taskData)
    return data
}
export async function deleteTask(projectId: string, taskId: string): Promise<{ message: string }> {
    const { data } = await api.delete(` /projects/${projectId}/tasks/${taskId}`)
    return data
}

export async function updateTask(projectId: string, taskId: string, taskData: Partial<CreateTaskDTO>): Promise<Task> {
    const { data } = await api.put<Task>(`/projects/${projectId}/tasks/${taskId}`, taskData)
    return data

}
