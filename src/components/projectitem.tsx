import { useState, type ChangeEvent } from 'react'
import { updateProject, deleteProject } from '../utils/api/projectApi'
import { type Project, type ProjectItem } from '../types/projectTypes'
export default function ProjectItem({ project }: ProjectItem) {
    const [formData, setFormData] = useState<Project>({
        _id: project._id,
        title: project.title,
        description: project.description,
        status: project.status,
        dueDate: project.dueDate,
        user: project.user
    })
    const [editing, setEditing] = useState(false)
    async function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        try {
            const update = await updateProject(project._id, formData)

        } catch (error) {

        }

    }
    return (
        <div>


        </div>
    )
}
