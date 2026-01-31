import { useState, useEffect } from 'react'
import type { Project } from '../../types/projectTypes'
import { deleteProject, getProjects, updateProject } from '../../utils/api/projectApi'
import CreateProject from '../../components/project/CreateProject'
import ProjectList from '../../components/project/ProjectList'

export default function ProjectDashBoard() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects()
                setProjects(data)
            } catch (error) {
                console.error("Failed to fetch projects:", error)
            }
        }
        fetchProjects()
    }, [])

    async function onDelete(projectId: string) {
        try {
            await deleteProject(projectId)
            setProjects(prev => prev.filter(project => project._id !== projectId))
        } catch (error) {
            console.error("Failed to delete project:", error)
        }
    }

    async function onChange(projectId: string, formData: Project) {
        try {
            const updated = await updateProject(projectId, formData)
            setProjects(prev =>
                prev.map(p => (p._id === projectId ? updated : p))
            )
        } catch (error) {
            console.error("Failed to update project:", error)
        }
    }

    return (
        <div>
            <CreateProject projects={projects} setProjects={setProjects} />
            <ProjectList projects={projects} onChange={onChange} onDelete={onDelete} />
        </div>
    )
}