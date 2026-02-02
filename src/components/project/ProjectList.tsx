
import type { Project, ProjectListProps } from '../../types/projectTypes'
import { useState } from 'react'
import ProjectItem from './projectitem'

export default function ProjectList({ projects, onChange, onDelete }: ProjectListProps) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <table>
            <thead>
                <tr>
                    <th>View</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>{isEditing ? 'Save' : 'Edit'}</th>
                    <th>{isEditing ? "Cancel" : 'Delete'}</th>
                </tr>
            </thead>

            <tbody>
                {
                    projects && projects.map((project: Project) => {
                        return <ProjectItem
                            key={project._id}
                            project={project}
                            onChange={onChange}
                            onDelete={onDelete}
                            setIsEditing={setIsEditing}
                        />
                    })

                }
            </tbody>
        </table>
    )
}