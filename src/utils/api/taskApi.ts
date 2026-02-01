import type { CreateTaskDTO, Task } from "../../types/types"
import { api } from "../../services/axios"
type taskResponse = {
    success: boolean,
    task: Task
}

export async function getTask(projectId: string): Promise<Task[]> {
    const { data } = await api.get<{ success: boolean; tasks: Task[] }>(`/projects/${projectId}/tasks`)
    console.log('Hello')
    return data.tasks

}
export async function createTask(projectId: string,
    taskData: CreateTaskDTO): Promise<Task> {
    console.log('created')
    const { data } = await api.post<taskResponse>(`/projects/${projectId}/tasks`, taskData)
    return data.task
}
export async function deleteTask(projectId: string, taskId: string): Promise<{ message: string }> {
    const { data } = await api.delete<{ message: string }>(`/projects/${projectId}/tasks/${taskId}`)
    return data
}

export async function updateTask(projectId: string, taskId: string, taskData: Partial<CreateTaskDTO>): Promise<Task> {
    const { data } = await api.put<taskResponse>(`/projects/${projectId}/tasks/${taskId}`, taskData)
    return data.task

}
