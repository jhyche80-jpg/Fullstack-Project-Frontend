import { useState, useEffect, useContext } from 'react'; import type { Project, CreateProjectDTO } from '../../types/projectTypes';
import { deleteProject, getProjects, updateProject } from '../../utils/api/projectApi'; import CreateProject from '../../components/project/CreateProject';
import ProjectList from '../../components/project/ProjectList'; import { motion } from 'motion/react';
import { BarChart } from '../../components/Charts/charts'; import '../../Styles/ProjectDashboard.css'
import Counter from '../../components/Counter/Counter'; import { useSave } from '../../Hooks/hooks';
import { LoginContext } from '../../context/Context';


export default function ProjectDashBoard() {
    const [projects, setProjects] = useState<Project[]>([]);
    // const [loading, setLoading] = useState(true);
    const [totalProjects, setTotalProjects] = useState<number>(() => {
        const savedTotal = localStorage.getItem("totalProjects");
        return savedTotal ? parseInt(savedTotal) : 0;
    });
    const loginContext = useContext(LoginContext)
    if (!loginContext) {
        throw new Error("NavBar must be used within a LoginProvider")
    }

    const { toggleLogin } = loginContext
    toggleLogin(true)

    useSave("totalProjects", totalProjects)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        }
        fetchProjects();
    }, []);

    async function onDelete(projectId: string) {
        try {
            await deleteProject(projectId);
            setProjects(prev => prev.filter(p => p._id !== projectId));
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    }

    async function onChange(projectId: string, formData: Partial<CreateProjectDTO>) {
        try {

            const updatedData: Partial<CreateProjectDTO> = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                dueDate: formData.dueDate || undefined
            };

            const updated = await updateProject(projectId, updatedData);
            setProjects(prev =>
                prev.map(p => (p._id === projectId ? updated : p))
            );
        } catch (error) {
            console.error('Failed to update project:', error);
        }
    }


    // counts for the projects 

    /// by status 
    const totalPending = projects.filter(p => p.status === "notStarted").length;
    const totalCompleted = projects.filter(p => p.status === "completed").length;
    const totalInProgress = projects.filter(p => p.status === "in-progress").length;
    const Total = totalCompleted + totalInProgress + totalInProgress

    const chartLabelsBar = ["Not Started", "In Progress", "Completed"]
    const chartValuesBar = [totalPending, totalInProgress, totalCompleted]

    return (
        <>

            <motion.div initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}
                transition={{ duration: 2 }} id='PDash'>
                <div>
                    <div>
                        <h1>Project Manager:</h1>

                    </div>
                    <Counter
                        Pending={totalPending}
                        Completed={totalCompleted}
                        InProgress={totalInProgress}
                        Total={Total}
                        Name='Projects'
                    />

                </div>
                <div id='ProjectChart'>
                    <BarChart labels={chartLabelsBar} values={chartValuesBar} />
                </div>

                <div id='ProjectArea'>
                    <CreateProject projects={projects} setProjects={setProjects} />

                    <ProjectList projects={projects} onChange={onChange} onDelete={onDelete} />

                </div>
                <div></div>



            </motion.div>
        </>

    );
}