import React, { useState, type ChangeEvent } from 'react'
import { type CreateTaskDTO, type CreateTaskProps } from '../../types/types'
import { createTask } from '../../utils/api/taskApi'
// title, description , duedate, status , priority 
export default function CreateTask({ setTasks, projectId }: CreateTaskProps) {
    const [formData, setFormData] = useState<CreateTaskDTO>({
        title: '',
        dueDate: '',
        description: '',
        status: 'notStarted',
        priority: 'low',

    })
    function handleChange(e: ChangeEvent<HTMLInputElement
        | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const data = await createTask(projectId, formData)
            console.log('created')
            setTasks((prev) => [...prev, data])
        } catch (error) {
            console.error('Failed to create Task', error)
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
            <textarea name="description" value={formData.description} onChange={handleChange} />
            <input type="date" name='dueDate' value={formData.dueDate} onChange={handleChange} />
            <select name="status" id="" value={formData.status} onChange={handleChange} >
                <option value="notStarted">Pending</option>
                <option value="in-progress"> In progress</option>
                <option value="completed">Completed</option>
            </select>
            <select name="priority" id="" value={formData.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type='submit'>Sumbit</button>
        </form>
    )
}
