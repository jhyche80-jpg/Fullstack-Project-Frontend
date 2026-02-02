
import type { Project, ProjectListProps } from '../../types/projectTypes'
import { useState } from 'react'
import ProjectItem from './projectitem'

export default function ProjectList({ projects, onChange, onDelete }: ProjectListProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    return (
        <>
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
                        projects && currentProjects.map((project: Project) => {
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