import type { TaskListProps } from '../../types/types'
import TaskItem from './taskItem'
import type { Task } from '../../types/types'
export default function TaskList({ tasks, onDelete, onChange }: TaskListProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date </th>
                    <th>Status</th>
                    <th>priority</th>
                    <th>Edit</th>
                    <th>Delete</th>
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
                        />
                    })

                }

            </tbody>
        </table>
    )
}
