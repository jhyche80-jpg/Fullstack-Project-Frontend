import { useState, useEffect } from 'react'
import type { Project } from '../../types/projectTypes'
import { getProjects } from '../../utils/api/projectApi'
import CreateProject from '../../components/CreateProject'
import ProjectList from '../../components/ProjectList'
// Show a chart of data 
// show a list of projects 
// add Projects to the list 
// Rerender the list!
export default function ProjectDashBoard() {
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {
        getProjects()
            .then(data => setProjects(data))
            .catch(error => console.error(error))
    }, [])
    return (
        <div>
            <CreateProject projects={projects} setProjects={setProjects} />
            <ProjectList projects={projects} />
        </div>
    )
}
