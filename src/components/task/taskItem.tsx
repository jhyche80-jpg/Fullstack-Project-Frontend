import { useState } from 'react'
import type { Status, Task, TaskItemProps, TaskPrio } from '../../types/types'

export default function TaskItem({ task, onDelete, onChange }: TaskItemProps) {
    const [formData, setFormData] = useState<Task>({
        _id: task._id,
        title: task.title,
        dueDate: task.dueDate,
        user: task.user,
        description: task.description,
        project: task.project,
        status: task.status,
        priority: task.priority
    })
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <form onSubmit={() => onChange(task.project, task._id, formData)}>
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
                <select name="status" id="" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="notStarted"> Not Started</option>
                </select>
                <label htmlFor="dueDate">Date:</label>
                <input type="date" name='dueDate' value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                <select name="priority" id="" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPrio })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>  </select>
                <button type='submit'>Add project</button>
                <button onClick={() => setEditing(false)}>  Cancel  </button>

            </form>
        )
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.dueDate && new Date(task.dueDate).toLocaleDateString()}</p>
            <p>{task.status}</p>
            <p>{task.priority}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.project, task._id)}>Delete</button>
        </div>
    )
}
