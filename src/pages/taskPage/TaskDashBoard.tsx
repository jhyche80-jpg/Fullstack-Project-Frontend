import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTask, updateTask } from '../../utils/api/taskApi'
import { type Task } from '../../types/types'
import TaskList from '../../components/task/taskList'
import CreateTask from '../../components/task/createtask'

export default function TaskDashBoard() {
    const { projectId } = useParams<{ projectId: string }>()
    if (!projectId) return
    // fetch the information 
    const [tasks, setTasks] = useState<Task[]>([])
    useEffect(() => {
        async function fetchTask() {
            try {
                if (!projectId) return
                const data = await getTask(projectId)
                setTasks(data)

            } catch (error) {
                console.error("Failed to fetch task for project:", error)
            }
        }
        fetchTask()
    }, [])

    async function HandleChange(projectId: string, taskId: string, taskData: Task) {
        try {
            const updated = await updateTask(projectId, taskId, taskData)
            setTasks(prev => prev.map(p => (p._id === taskId ? updated : p)))
        } catch (error) {

        }
    }
    async function HandleDelete() {

    }
    return (
        <div>
            <CreateTask tasks={tasks} setTasks={setTasks} projectId={projectId} />
            <TaskList tasks={tasks} onChange={HandleChange} onDelete={HandleDelete} />
        </div>
    )
}
