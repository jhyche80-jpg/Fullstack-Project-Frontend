import { useState } from 'react'
import type { Status, Task, TaskItemProps, TaskPrio } from '../../types/types'

export default function TaskItem({ task, onDelete, onChange }: TaskItemProps) {
    const [formData, setFormData] = useState<Task>({ ...task })
    const [editing, setEditing] = useState(false)

    if (editing) {
        return (
            <tr
                onSubmit={(e) => {

                    const projectId = typeof task.project === 'string' ? task.project : task.project._id
                    onChange(projectId, task._id, formData)
                    setEditing(false)
                }}
            >
                <td>  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
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
                    value={formData.priority}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value as TaskPrio })
                    }
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select></td>
                <td><button type="submit">Save Task</button></td>
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
            <td>{task.status}</td>
            <td>{task.priority}</td>

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