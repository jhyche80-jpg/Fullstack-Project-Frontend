import { useState, useEffect } from 'react'
import type { Project } from '../../types/projectTypes'
import { deleteProject, getProjects, updateProject } from '../../utils/api/projectApi'
import CreateProject from '../../components/CreateProject'
import ProjectList from '../../components/ProjectList'
// Show a chart of data 
// show a list of projects 
// add Projects to the list 
// Rerender the list!
export default function ProjectDashBoard() {
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {
        async function FetchProjects() {
            try {
                const data = await getProjects()
                setProjects(data)
            } catch (error) {
                console.error(error)
            }

        } FetchProjects(), []
    })
    async function onDelete(projectId: string) {
        try {
            await deleteProject(projectId)
            setProjects(prev => prev.filter(project => project._id !== projectId))
        } catch (error) {
            console.error(error)
        }
    }
    async function onChange(projectId: string, formData: Project) {
        try {
            await updateProject(projectId, formData)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <CreateProject projects={projects} setProjects={setProjects} />
            <ProjectList projects={projects} onChange={onChange} onDelete={onDelete} />
        </div>
    )
}
