import React, { useState, type ChangeEvent } from 'react'
import { type CreateTaskDTO, type CreateTaskProps } from '../../types/types'
import { createTask } from '../../utils/api/taskApi'
import '../../Styles/createProject.css'
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
        setFormData({
            title: '',
            dueDate: '',
            description: '',
            status: 'notStarted',
            priority: 'low',
        })
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='CreateProject'>

            <div className='Area' id='sectionOne'>
                <div className='Section'>

                    <div className='CreateArea' id='TitleInput'>
                        <label htmlFor="title"> <strong>Title:</strong></label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='CreateArea' id='DescriptInput'>
                        <label htmlFor="Description"> <strong>Description:</strong></label>
                        <input name="description" value={formData.description} onChange={handleChange} /></div>
                    <div className='CreateArea' id='dateInput'>
                        <label htmlFor="date"> <strong>Date:</strong></label>
                        <input type="date" name='dueDate' value={formData.dueDate} onChange={handleChange} /></div>
                    <div className='CreateArea' id='statusInput'>
                        <label htmlFor="status"><strong>Status:</strong></label>
                        <select name="status" id="" value={formData.status} onChange={handleChange} >
                            <option value="notStarted">Pending</option>
                            <option value="in-progress"> In progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className='CreateArea' id='statusInput'>
                        <label htmlFor="priority"><strong>Priority:</strong></label>
                        <select name="priority" id="" value={formData.priority} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <button type='submit' id='addProj'>Sumbit</button>
                </div>







            </div>

        </form>
    )
}
