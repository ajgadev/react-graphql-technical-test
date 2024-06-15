import  { Project } from '../type'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'

const ProjectList = ({ projects } : { projects: Project[] }) => { 
    return (
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => (
                <li className='m-0' key={project.id}>
                    <Link to={`/projects/${project.key}`}>
                        <ProjectCard project={project} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default ProjectList; 