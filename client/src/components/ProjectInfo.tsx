import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Packaging, Project, Component } from '../type'

const PROJECT_INFO = gql`
  query ProjectInfo($projectId: String!) {
    project(id: $projectId) {
      id
      name
      key
      packagings {
        id
        name
        position
        packagingType
        width
        length
        height
        volume
        weight
        components {
          id
          name
          weight
        }
      }
    }
  }
`
const ProjectInfo = () => {
    const { projectId } = useParams()
    const { loading, error, data } = useQuery(PROJECT_INFO, { variables: { projectId: `projects/${projectId}` } })
    const project: Project | undefined = data?.project
    const sortedPackagings = project?.packagings?.sort((a, b) => a.position - b.position) || []
    if (error) return <span className='error'>{error.message}</span>
    return (
        <div>
            <h1>Project Info {projectId}</h1>
            {loading && <p>Loading...</p>}
            {project && (
                <div className='p-4 border-2 border-gray-200 rounded-lg'>  
                    <h1 className='text-2xl font-bold underline mb-2'>{project.name}</h1>
                    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {sortedPackagings.map((packaging : Packaging) => (
                            <li className='m-0' key={packaging.id}>
                                <h2 className='text-xl font-bold underline'>{packaging.name}</h2>
                                <span>Type: {packaging.packagingType}</span>
                                <span>Width: {packaging.width}</span>
                                <span>Length: {packaging.length}</span>
                                <span>Height: {packaging.height}</span>
                                <span>Volume: {packaging.volume}</span>
                                <span>Weight: {packaging.weight}</span>
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                                    {packaging.components?.map((component : Component) => (
                                        <div className='m-0' key={component.id}>
                                            <h2 className='text-xl font-bold underline'>{component.name}</h2>
                                            <span>Weight: {component.weight}</span>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ProjectInfo