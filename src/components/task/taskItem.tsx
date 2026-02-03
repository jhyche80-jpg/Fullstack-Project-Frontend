import { useState } from 'react'
import type { Status, Task, TaskItemProps, TaskPrio } from '../../types/types'
import '../../Styles/Item.css'

export default function TaskItem({ task, onDelete, onChange, setIsEditing }: TaskItemProps) {
    const [formData, setFormData] = useState<Task>({
        _id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
        status: task.status,
        priority: task.priority,
        user: task.user,
        project: task.project

    })
    const [editing, setEditing] = useState(false)
    async function handleUpdate() {
        try {
            const updatedData = {
                ...formData,
                dueDate: formData.dueDate ?? new Date(formData.dueDate + "T12:00:00")
            };
            const projectId = typeof task.project === 'string' ? task.project : task.project._id

            await onChange(projectId, task._id, updatedData)
            setEditing(false)
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating project:', error)
        }
    }
    function Status(status: Status) {
        switch (status) {
            case 'in-progress':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            case 'notStarted':
                return 'Pending';
        }
    }
    function TaskPrio(prio: TaskPrio) {
        switch (prio) {
            case 'high': return 'High'
            case 'medium': return 'Medium'
            case 'low': return "Low"
        }
    }
    const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() && task.status !== 'completed' : false

    if (editing) {
        return (
            <tr className={isOverdue ? 'overDue' : 'notOverdue'}>
                <td>  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter a title"
                />
                </td>
                <td>  <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter description"
                /></td>
                <td><input
                    type="date"
                    value={formData.dueDate ? formData.dueDate.slice(0, 10) : ''}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            dueDate: e.target.value
                        })
                    }
                /></td>
                <td><select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as Status })
                    }
                >
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="notStarted">Not Started</option>
                </select>
                </td>

                <td><select
                    value={formData.priority}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value as TaskPrio })
                    }
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select></td>
                <td><button type="submit" onClick={handleUpdate}>Save Task</button></td>
                <td><button type="button" onClick={() => setEditing(false)}>
                    Cancel
                </button>
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate && new Date(task.dueDate).toLocaleDateString()}</td>
            <td className={task.status}>{Status(task.status)}</td>
            <td className={task.priority}>{TaskPrio(task.priority)}</td>

            <td><button onClick={() => setEditing(true)}>Edit</button></td>
            <td>
                <button onClick={() => {
                    const projectId = typeof task.project === 'string' ? task.project : task.project._id
                    onDelete(projectId, task._id)
                }}>
                    Delete
                </button></td>
        </tr >
    )
}