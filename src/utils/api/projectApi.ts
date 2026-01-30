import { api } from "../../services/axios"
import type { CreateProjectDTO, Project } from "../../types/projectTypes"


export async function getProjects(): Promise<Project[]> {
    try {
        const { data } = await api.get<Project[]>('/projects')
        return data
    } catch (error) {

        console.error('failed to fetch Projects', error)
        throw error
    }

}
export async function createProject(formData: CreateProjectDTO): Promise<Project> {
    try {
        const { data } = await api.post<Project>('/projects', formData)
        return data
    } catch (error) {
        console.error('Failed to create Project')
        throw error
    }
}
export async function deleteProject(id: string): Promise<{ message: string }> {
    try {
        const { data } = await api.delete(`/projects/${id}`)
        return data
    } catch (error) {
        console.error("Error deleting the project!", error)
        throw error
    }


}
export async function updateProject(id: string, formData: Partial<CreateProjectDTO>): Promise<Project> {
    try {
        const { data } = await api.put(`/projects/${id}`, formData)
        return data
    } catch (error) {
        console.error("problem updating Project", error)
        throw error
    }
}


