import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask, deleteTask } from '../../utils/api/taskApi'
import { type Task } from '../../types/types'
import TaskList from '../../components/task/taskList'
import CreateTask from '../../components/task/createtask'

export default function TaskDashBoard() {
    const nav = useNavigate()
    const { projectId } = useParams<{ projectId: string }>()
    if (!projectId) return null
    // fetch the information 
    const [tasks, setTasks] = useState<Task[]>([])
    const [createTask, setCreateTask] = useState(false)
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
    }, [projectId])

    async function HandleChange(projectId: string, taskId: string, taskData: Task) {
        try {
            const updatedData = {
                title: taskData.title,
                description: taskData.description,
                dueDate: taskData.dueDate || undefined,
                status: taskData.status,
                priority: taskData.priority
            }
            const updated = await updateTask(projectId, taskId, updatedData)
            setTasks(prev => prev.map(t => (t._id === taskId ? updated : t)))

        } catch (error) {
            console.error('failed to update Task', error)
        }
    }
    async function handleDelete(projectId: string, taskId: string) {
        try {
            await deleteTask(projectId, taskId)
            setTasks(prev => prev.filter(task => task._id !== taskId))
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }



    return (
        <div>
            <button onClick={() => nav('/projects')}>Back</button>

            <button onClick={() => setCreateTask(prev => !prev)}>{createTask === false ? 'Create Task' : 'Cancel'}</button>
            {createTask && <CreateTask tasks={tasks} setTasks={setTasks} projectId={projectId} />}
            <TaskList tasks={tasks} onChange={HandleChange} onDelete={handleDelete} />
        </div >
    )
}
