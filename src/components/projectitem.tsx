import { useState } from 'react'
import { type Project, type ProjectItem, type ProjectStatus } from '../types/projectTypes'
export default function ProjectItem({ project, onChange, onDelete }: ProjectItem) {
    const [formData, setFormData] = useState<Project>({
        _id: project._id,
        title: project.title,
        description: project.description,
        status: project.status,
        dueDate: project.dueDate,
        user: project.user
    })
    const [editing, setEditing] = useState(false)
    async function handleUpdate() {
        onChange(project._id, formData)
    }

    // two sections 
    if (editing) {
        return (
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder='Enter a title'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    name='title' />
                <textarea
                    placeholder='Enter description'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    name='description' />
                <select name="status" id="" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="notStarted"> Not Started</option>
                </select>
                <label htmlFor="dueDate">Date:</label>
                <input type="date" name='dueDate' value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                <button type='submit'>Add project</button>
                <button onClick={() => setEditing(false)}>  Cancel  </button>

            </form>
        )
    }
    return (
        <div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.dueDate && new Date(project.dueDate).toLocaleDateString()}</p>
            <p>{project.status}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(project._id)}>Delete</button>
        </div>
    )
}
