import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask, deleteTask } from '../../utils/api/taskApi'
import { type Task } from '../../types/types'
import TaskList from '../../components/task/taskList'
import CreateTask from '../../components/task/createtask'
import { motion } from 'motion/react'
import Counter from '../../components/Counter/Counter'
import { Piechart } from '../../components/Charts/charts'
import '../../Styles/ProjectDashboard.css'
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
    const totalPending = tasks.filter(t => t.status === "notStarted").length;
    const totalCompleted = tasks.filter(t => t.status === "completed").length;
    const totalInProgress = tasks.filter(t => t.status === "in-progress").length;

    const totalLow = tasks.filter(t => t.priority === "low").length;
    const totalMedium = tasks.filter(t => t.priority === "medium").length;
    const totalHigh = tasks.filter(t => t.priority === "high").length;

    const Total = totalCompleted + totalInProgress + totalInProgress

    const PiChartLable = ['Low', 'Medium', 'High']
    const PiChartValue = [totalLow, totalMedium, totalHigh]

    const chartLabelsBar = ['Total Pending', 'Total Completed', 'Total In-Progress']
    const chartValuesBar = [totalPending, totalInProgress, totalCompleted]

    return (
        <motion.div initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className='PDash' >
            <h1>Tasks:</h1>
            <Counter
                Pending={totalPending}
                Completed={totalCompleted}
                InProgress={totalInProgress}
                Total={Total}
                Name='Tasks'
            />
            <div id='Chart'>
                <div className='TaskChart'>
                    <Piechart labels={chartLabelsBar} values={chartValuesBar} />

                </div>
                <div className='TaskChart'>
                    <Piechart labels={PiChartLable} values={PiChartValue} />

                </div>
            </div>


            <div>
                <button onClick={() => nav('/projects')}>Back</button>
                <button onClick={() => setCreateTask(prev => !prev)}>{createTask === false ? 'Create Task' : 'Cancel'}</button>
            </div>

            {createTask && <CreateTask tasks={tasks} setTasks={setTasks} projectId={projectId} />}

            <TaskList tasks={tasks} onChange={HandleChange} onDelete={handleDelete} />
        </motion.div >
    )
}
