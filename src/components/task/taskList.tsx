import type { TaskListProps } from '../../types/types'
import TaskItem from './taskItem'
import type { Task } from '../../types/types'
import { useState } from 'react'
export default function TaskList({ tasks, onDelete, onChange }: TaskListProps) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date </th>
                    <th>Status</th>
                    <th>priority</th>
                    <th>{isEditing ? 'Save' : 'Edit'}</th>
                    <th>{isEditing ? "Cancel" : 'Delete'}</th>
                </tr>

            </thead>
            <tbody>
                {
                    tasks && tasks.map((task: Task) => {
                        return < TaskItem
                            key={task._id}
                            onDelete={onDelete}
                            onChange={onChange}
                            task={task}
                            setIsEditing={setIsEditing}
                        />
                    })

                }

            </tbody>
        </table>
    )
}
