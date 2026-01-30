import type { CreateTaskDTO, Task } from "../../types/types"
import { api } from "../../services/axios"
export async function getTask(projectId: string): Promise<Task[]> {
    try {
        const { data } = await api.get<Task[]>(`/projects/${projectId}/tasks`)
        return data
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error fetching project Task')
        }
        throw error
    }
}
export async function createTask(projectId: string, taskData: CreateTaskDTO): Promise<Task> {
    try {
        const { data } = await api.post(`/projects/${projectId}/tasks`, taskData)
        return data
    } catch (error) {
        console.error('Error creating task', error)
        throw error
    }
}
export async function deleteTask(projectId: string, taskId: string): Promise<{ message: string }> {
    try {
        const { data } = await api.delete(` / projects / ${projectId} / tasks/${taskId}`)
        return data
    } catch (error) {
        console.error("Problem deleting task", error)
        throw error
    }
}
export async function name(projectId: string, taskId: string, taskData: Partial<CreateTaskDTO>): Promise<Task> {
    try {
        const { data } = await api.put(`/ projects / ${projectId} / tasks/${taskId}`, taskData)
        return data
    } catch (error) {
        console.error("Problem updating the task", error)
        throw error
    }
}
