import { UNSAFE_shouldHydrateRouteLoader } from "react-router-dom";
import { api } from "../../services/axios"
import type { CreateProjectDTO, Project } from "../../types/projectTypes"


export async function getProjects(token: string, userId: string): Promise<Project[]> {
    try {
        const response = await api.get('/projects', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId,
            },
        });
        return response.data;
    }
    catch (error) {

        console.error('failed to fetch Projects', error)
        throw error
    }

}
export async function createProject(formData: CreateProjectDTO,): Promise<Project> {
    try {
        const token = await localStorage.getItem('token')
        if (!token) throw new Error("no bearer token")

        const { data } = await api.post<Project>('/projects', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error('Failed to create Project')
        throw error
    }
}
export async function deleteProject(id: string): Promise<{ message: string }> {
    try {
        const token = await localStorage.getItem('token')
        if (!token) throw new Error("no bearer token")

        const { data } = await api.delete(`/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("Error deleting the project!", error)
        throw error
    }


}
export async function updateProject(id: string, formData: Partial<CreateProjectDTO>): Promise<Project> {
    try {
        const token = await localStorage.getItem('token')
        if (!token) throw new Error("no bearer token")

        const { data } = await api.put(`/projects/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("problem updating Project", error)
        throw error
    }
}


