import type { TaskListProps } from '../../types/types'
import TaskItem from './taskItem'
import type { Task } from '../../types/types'
export default function TaskList({ tasks, onDelete, onChange }: TaskListProps) {
    return (
        <div>
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


        </div>
    )
}
