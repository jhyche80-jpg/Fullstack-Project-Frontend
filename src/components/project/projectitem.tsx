import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project, ProjectItem as ProjectItemType, ProjectStatus } from '../../types/projectTypes';
import '../../Styles/Item.css'

export default function ProjectItem({ project, onChange, onDelete, setIsEditing }: ProjectItemType) {
    // Store dueDate as string "YYYY-MM-DD"
    const [formData, setFormData] = useState<Project>({
        ...project,
        dueDate: project.dueDate ? project.dueDate.slice(0, 10) : '', // always string for input
    });


    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`/projects/${project._id}/tasks`);

    async function handleUpdate() {
        try {
            // Convert to Date only for backend
            const updatedData = {
                ...formData,
                dueDate: formData.dueDate ?? new Date(formData.dueDate + "T12:00:00")
            };
            if (!formData.dueDate) return setFormData({ ...formData, dueDate: '' })
            await onChange(project._id, updatedData);
            setEditing(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }
    const isOverdue = project.dueDate
        ? new Date(project.dueDate) < new Date() && project.status !== 'completed'
        : false;

    function Status(status: ProjectStatus) {
        switch (status) {
            case 'in-progress': return 'In Progress';
            case 'completed': return 'Completed';
            case 'notStarted': return 'Not Started';
        }
    }

    if (editing) {
        return (
            <tr>
                <td />
                <td>
                    <input
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </td>
                <td>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </td>
                <td>
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                </td>
                <td>
                    <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="notStarted">Not Started</option>
                    </select>
                </td>
                <td>
                    <button onClick={handleUpdate}>Save</button>
                </td>
                <td>
                    <button onClick={() => { setEditing(false); setIsEditing(false); }}>Cancel</button>
                </td>
            </tr>
        );
    }

    return (
        <tr className={isOverdue ? 'overDue' : 'notOverdue'}>
            <td><button onClick={handleNavigate}>View task</button></td>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : ''}</td>
            <td className={project.status}>{Status(project.status)}</td>
            <td>
                <button onClick={() => { setEditing(true); setIsEditing(true); }}>Edit</button>
            </td>
            <td>
                <button onClick={() => onDelete(project._id)}>Delete</button>
            </td>
        </tr>
    );
}