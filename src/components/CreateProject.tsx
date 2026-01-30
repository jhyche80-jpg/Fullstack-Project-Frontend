import React, { useState, type ChangeEvent } from 'react'
import type { CreateProjectDTO, createProjectProps } from '../types/projectTypes'
import { createProject } from '../utils/api/projectApi'

export default function CreateProject({ setProjects }: createProjectProps) {
    const [formData, setFormData] = useState<CreateProjectDTO>({
        title: '',
        description: '',
        status: 'notStarted',
        dueDate: ''

    })
    function handleChange(event: ChangeEvent<HTMLInputElement
        | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const data = await createProject(formData)
            setProjects((prev) => [...prev, data])
        } catch (error) {
            console.error("Error creating project:", error)
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter a title'
                value={formData.title}
                onChange={handleChange}
                name='title' />
            <textarea
                placeholder='Enter description'
                value={formData.description}
                onChange={handleChange}
                name='description' />
            <select name="status" id="" value={formData.status} onChange={handleChange}>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="notStarted"> Not Started</option>
            </select>
            <label htmlFor="dueDate">Date:</label>
            <input type="date" name='dueDate' value={formData.dueDate} onChange={handleChange} />
            <button type='submit'>Add project</button>
        </form>
    )
}
