import { useState, type ChangeEvent } from 'react';
import type { CreateProjectDTO, createProjectProps } from '../../types/projectTypes';
import { createProject } from '../../utils/api/projectApi';
import '../../Styles/createProject.css'

export default function CreateProject({ setProjects }: createProjectProps) {
    const [formData, setFormData] = useState<CreateProjectDTO>({
        title: '',
        description: '',
        status: 'notStarted',
        dueDate: ''
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newProject: CreateProjectDTO = {
            ...formData,
            dueDate: formData.dueDate || undefined
        };

        try {
            const created = await createProject(newProject);
            setProjects(prev => [...prev, created]);
            setFormData({ title: '', description: '', status: 'notStarted', dueDate: '' }); // reset form
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='CreateProject'>
            <div className='Area' id='sectionOne'>
                <div className='Section'>
                    <div className='CreateArea' id='TitleInput'>
                        <label htmlFor="title"> <strong>Title:</strong></label>
                        <input
                            type="text"
                            placeholder='Enter a title'
                            value={formData.title}
                            onChange={handleChange}
                            name='title'
                            id='TitleInput'
                        />
                    </div>
                    <div className='CreateArea' id='DescriptInput'>
                        <label htmlFor='description'>  <strong>Description:</strong></label>
                        <input
                            placeholder='Enter description'
                            value={formData.description}
                            onChange={handleChange}
                            name='description'
                            max={10}
                        />
                    </div>



                    <div className='CreateArea' id='statusInput'>

                        <label htmlFor="status">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="in-progress">In progress</option>
                            <option value="completed">Completed</option>
                            <option value="notStarted">Not Started</option>
                        </select>
                    </div>

                    <div className='CreateArea' id='dateInput'>
                        <label htmlFor="dueDate">Date:</label>
                        <input
                            type="date"
                            name='dueDate'
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' id='addProj'>Add project</button>
                </div>

            </div>



        </form>
    );
}