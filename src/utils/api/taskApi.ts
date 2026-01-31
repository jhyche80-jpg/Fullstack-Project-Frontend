import type { CreateTaskDTO, Task } from "../../types/types"
import { api } from "../../services/axios"

const token = await localStorage.getItem('token')

export async function getTask(projectId: string): Promise<Task[]> {
    try {
        if (!token) throw new Error("no bearer token")
        const { data } = await api.get<Task[]>(`/projects/${projectId}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("Error fetching project tasks", error);
        throw error;
    }
}
export async function createTask(projectId: string, taskData: CreateTaskDTO): Promise<Task> {
    try {

        if (!token) throw new Error("no bearer token")
        const { data } = await api.post<Task>(`/projects/${projectId}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error('Error creating task', error)
        throw error
    }
}
export async function deleteTask(projectId: string, taskId: string): Promise<{ message: string }> {
    try {

        if (!token) throw new Error("no bearer token")
        const { data } = await api.delete<{ message: string }>(` /projects/${projectId}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("Problem deleting task", error)
        throw error
    }
}

export async function updateTask(projectId: string, taskId: string, taskData: Partial<CreateTaskDTO>): Promise<Task> {
    try {

        if (!token) throw new Error("no bearer token")
        const { data } = await api.put<Task>(`/projects/${projectId}/tasks/${taskId}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("Problem updating the task", error)
        throw error
    }
}
