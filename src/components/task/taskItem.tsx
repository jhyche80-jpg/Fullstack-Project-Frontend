import { useState } from 'react'
import type { Status, Task, TaskItemProps, TaskPrio } from '../../types/types'

export default function TaskItem({ task, onDelete, onChange }: TaskItemProps) {
    const [formData, setFormData] = useState<Task>({ ...task })
    const [editing, setEditing] = useState(false)

    if (editing) {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const projectId = typeof task.project === 'string' ? task.project : task.project._id
                    onChange(projectId, task._id, formData)
                    setEditing(false)
                }}
            >
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter a title"
                />

                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter description"
                />

                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as Status })
                    }
                >
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="notStarted">Not Started</option>
                </select>

                <label>Due Date:</label>
                <input
                    type="date"
                    value={formData.dueDate ? formData.dueDate.slice(0, 10) : ''}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            dueDate: e.target.value
                        })
                    }
                />

                <select
                    value={formData.priority}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value as TaskPrio })
                    }
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit">Save Task</button>
                <button type="button" onClick={() => setEditing(false)}>
                    Cancel
                </button>
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
            <button onClick={() => {
                const projectId = typeof task.project === 'string' ? task.project : task.project._id
                onDelete(projectId, task._id)
            }}>
                Delete
            </button>
        </div >
    )
}