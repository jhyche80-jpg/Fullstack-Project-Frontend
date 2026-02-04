import type { TaskListProps } from '../../types/types'
import TaskItem from './taskItem'
import type { Task } from '../../types/types'
import { useState } from 'react'
export default function TaskList({ tasks, onDelete, onChange }: TaskListProps) {
    const [isEditing, setIsEditing] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const totalPages = Math.ceil(tasks.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTasks = tasks.slice(
        startIndex,
        startIndex + itemsPerPage
    )
    return (
        <>

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
                        tasks && currentTasks.map((task: Task) => {
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

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                >
                    Next
                </button>
            </div>


        </>

    )
}
