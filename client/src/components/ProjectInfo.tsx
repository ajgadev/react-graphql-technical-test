import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Packaging, Project, Component } from '../type'
import { PROJECT_INFO } from '../queryConsts'

const ProjectInfo = () => {
    const { projectId } = useParams()
    const { loading, error, data } = useQuery(PROJECT_INFO, { variables: { projectId: `projects/${projectId}` } })
    const project: Project | undefined = data?.project
    console.log(project)
    const sortedPackagings = project?.packagings?.sort((a, b) => a.position - b.position) || []
    if (error) return <span className='error'>{error.message}</span>
    return (
        <div>
            <h1>Project Info {projectId}</h1>
            {loading && <p>Loading...</p>}
            {project && (
                <div className='p-4'>  
                    <h1 className='text-2xl font-bold underline mb-2'>{project.name}</h1>
                    <h3 className='flex items-start font-bold'>Packagings:</h3>
                    <ul className='w-full border-2 border-gray-200 rounded-lg'>
                        {sortedPackagings.map((packaging : Packaging) => (
                            <li className='m-0 p-2' key={packaging.id}>
                                <h2 className='text-xl font-bold'>{packaging.name}</h2>
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                                    <div className='flex flex-col'>
                                        <span><strong>Type:</strong> {packaging.packagingType}</span>
                                        <span><strong>Width:</strong> {packaging.width} cm</span>
                                        <span><strong>Length:</strong> {packaging.length} cm</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span><strong>Weight:</strong> {packaging.weight} g</span>
                                        <span><strong>Height:</strong> {packaging.height} cm</span>
                                        <span><strong>Volume:</strong> {packaging.volume} cm</span>
                                    </div>
                                </div>
                                <h3 className='flex items-start font-bold mt-4'>Components:</h3>
                                <ul className='w-full p-2 gap-4 flex flex-col'>
                                    {packaging.components?.map((component : Component) => (
                                        <li className='m-0' key={component.id}>
                                            <div className='border-2 border-gray-200 rounded p-2'>
                                                <h2 className='text-small font-bold underline'>Name: {component.name}</h2>
                                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                                    <div className='flex flex-col'>
                                                        <span><strong>Weight:</strong> {component.weight} g</span>
                                                        <span><strong>Opacity:</strong> {component.opacity}</span>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span><strong>Type:</strong> {component.componentType}</span>
                                                        <span><strong>Coverage:</strong> {component.coverage}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ProjectInfo