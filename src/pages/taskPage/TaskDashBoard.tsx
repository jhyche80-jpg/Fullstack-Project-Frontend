import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTask } from '../../utils/api/taskApi'
import { type Task } from '../../types/types'

export default function TaskDashBoard() {
    const { projectId } = useParams<{ projectId: string }>()
    // fetch the information 
    const [task, setTask] = useState<Task[]>([])
    useEffect(() => {
        async function fetchTask() {
            try {
                if (!projectId) return
                const data = await getTask(projectId)
                setTask(data)

            } catch (error) {
                console.error("Failed to fetch task for project:", error)
            }
        }
        fetchTask()
    }, [])
    return (
        <div>

        </div>
    )
}
