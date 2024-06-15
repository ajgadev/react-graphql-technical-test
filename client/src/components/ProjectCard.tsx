import { Project } from '../type'
const ProjectCard = ({ project } : { project: Project }) => {
    return (
        <div className='p-8 border-2 border-gray-200 rounded-lg'>
            <h1 className='text-1 xl font-bold'>{project.name}</h1>
            <p>{project.key}</p>
        </div>
    )
}

export default ProjectCard;