import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Packaging, Project } from '../type'
import { PROJECT_INFO } from '../queryConsts'
import { PackagingCard } from './PackagingCard'

const ProjectInfo = () => {
    const { projectId } = useParams()
    const { loading, error, data } = useQuery(PROJECT_INFO, { variables: { projectId: `projects/${projectId}` } })
    const project: Project | undefined = data?.project
    console.log(project)
    const sortedPackagings = project?.packagings?.sort((a, b) => a.position - b.position) || []
    if (error) return <span className='error'>{error.message}</span>
    return (
        <div>
            {loading && <p>Loading...</p>}
            {project && (
                <div className='p-4'>  
                    <h1 className='text-2xl font-bold underline mb-2'>{project.name}</h1>
                    <h3 className='flex items-start font-bold'>Packagings:</h3>
                    <ul className='w-full border-2 border-gray-200 rounded-lg'>
                        {sortedPackagings.map((packaging : Packaging) => (
                            <li key={packaging.id}>
                                <PackagingCard packaging={packaging} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ProjectInfo