import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Packaging, Project, PackagingFormData } from '../type'
import { PROJECT_INFO } from '../graphql/queryConsts'
import { PackagingCard } from './PackagingCard'
import { useCallback, useEffect, useState } from 'react'
import { ArrowBack } from '../icons/arrow_back'
import { useMutation } from '@apollo/client'
import { MUTATION_CREATE_PACKAGING } from '../graphql/packagingConsts'
import { PackagingForm } from './PackagingForm'
import { Plus } from '../icons/plus'

const ProjectInfo = () => {
    const { projectId } = useParams()
    const { loading, error, data } = useQuery(PROJECT_INFO, { variables: { projectId: `projects/${projectId}` } })
    const [project, setProject] = useState<Project | undefined>(data?.project)
    const handleUpdateProject = useCallback((project: Project) => {
        setProject(project);
    }, []);
    const [isOpenCreatePackaging, setIsOpenCreatePackaging] = useState(false);
    const [createPackaging] = useMutation(MUTATION_CREATE_PACKAGING);

    const onSubmitCreatePackaging = useCallback(async(packagingNewData: PackagingFormData) => {
        setIsOpenCreatePackaging(false)
        const data = await createPackaging({
            variables: {
                input: {
                    projectId: project?.id,
                    packagingInfo: packagingNewData
                }
            }
        })
        if (data?.data?.createPackaging) {
            const newProject = data.data.createPackaging;
            handleUpdateProject(newProject);
        }
    },[project]);

    useEffect(() => {
        if (data?.project) {
            setProject(data.project)
        }
    }, [data?.project]);

    if (error) return <span className='error'>{error.message}</span>
    return (
        <div>
            <Link to='/' className='text-blue-300 hover:text-blue-400 font-bold float-left'>
                <ArrowBack />
            </Link>
            {loading && <p>Loading...</p>}
            {project && (
                    <div className='p-4'>  
                        <h1 className='text-2xl font-bold underline mb-2'>{project.name}</h1>
                        <h3 className='flex items-start font-bold px-2'>Packagings:
                            <button onClick={() => setIsOpenCreatePackaging(true)}>
                                <Plus />
                            </button>
                        </h3>
                        <ul className='w-full p-2 gap-4 flex flex-col'>
                            {isOpenCreatePackaging
                            ? (<PackagingForm onSubmit={onSubmitCreatePackaging} onClose={() => setIsOpenCreatePackaging(false)}/>)
                            : <>
                                {project.packagings?.map((packaging : Packaging) => (
                                    <li key={packaging.id}>
                                        <PackagingCard packaging={packaging} projectId={project.id} updateProject={handleUpdateProject} />
                                    </li>
                                ))}
                            </>}
                        </ul>
                    </div>
            )}
        </div>
    )
}

export default ProjectInfo