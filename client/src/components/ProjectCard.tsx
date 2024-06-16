import { Project } from '../type'
const ProjectCard = ({ project } : { project: Project }) => {
    return (
        <div className='p-8 border-2 border-gray-200 rounded-lg'>
            <h1 className='text-1 xl font-bold mb-2'>{project.name}</h1>
            <p className='text-sm text-gray-500 flex justify-start'>Packagings:</p>
            <ul className='flex flex-col gap-2 '>
                {project.packagings?.map((packaging) => (
                    <li className='flex flex-row gap-2 rounded bg-gray-200 py-2 px-4 items-center justify-between'>
                        <span className='text-xs text-blue-500 overflow-ellipsis text-nowrap whitespace-nowrap'>{packaging.name}</span>
                        <span className='bg-blue-400 w-[80%] h-3 rounded'></span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectCard;