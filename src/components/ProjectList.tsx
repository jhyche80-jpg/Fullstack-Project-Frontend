
import type { Project, ProjectListProps } from '../types/projectTypes'
import ProjectItem from './projectitem'

export default function ProjectList({ projects, onChange, onDelete }: ProjectListProps) {
    return (
        <div>
            {
                projects && projects.map((project: Project) => {
                    return < ProjectItem key={project._id}
                        project={project}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                })

            }

        </div>
    )
}
