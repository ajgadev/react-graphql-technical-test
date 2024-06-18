import { ComponentFormData, Packaging, Project } from "../type";
import { Component } from "../type";
import { ComponentCard } from "./ComponentCard";
import { Plus } from "../icons/plus";
import { useState } from "react";
import { ComponentForm } from "./ComponentForm";
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_COMPONENT } from "../graphql/componentConsts";
import { Trash } from "../icons/trash";
import { EditPencil } from "../icons/edit_pencil";
import { Copy } from "../icons/copy";
import { MUTATION_UPDATE_PACKAGING, MUTATION_DUPLICATE_PACKAGING, MUTATION_DELETE_PACKAGING } from "../graphql/packagingConsts";
import { PackagingFormData } from "../type";
import { PackagingForm } from "./PackagingForm";

export const PackagingCard = ({ packaging, projectId, updateProject }: { packaging: Packaging, projectId: string, updateProject?: (project: Project) => void }) => {
    // Create a new component
    const [isOpenCreateComponent, setIsOpenCreateComponent] = useState(false);
    const [createComponent] = useMutation(MUTATION_CREATE_COMPONENT);
    const onSubmitCreateComponent = async (newComponentValues: ComponentFormData) => {
        setIsOpenCreateComponent(false);
        const data = await createComponent({
            variables: {
                input: {
                    projectId: projectId,
                    packagingId: packaging.id,
                    componentInfo: newComponentValues
                }
            }
        });
        if (data?.data?.createComponent) {
            const newProject = data.data.createComponent;
            if (updateProject) updateProject(newProject);
        }
    }
    // End Create a new component
    const canBeEdited = packaging.id !== '' &&  projectId !== '';
    const [isEditing, setIsEditing] = useState(false);
    const [editPackaging] = useMutation(MUTATION_UPDATE_PACKAGING);
    const [duplicatePackaging] = useMutation(MUTATION_DUPLICATE_PACKAGING, 
        {
            variables: {
                input: {
                    projectId: projectId,
                    packagingId: packaging.id
                }
            }
        });
    const [deletePackaging] = useMutation(MUTATION_DELETE_PACKAGING, 
        {
            variables: {
                input: {
                    projectId: projectId,
                    packagingId: packaging.id
                }
            }
        });
    const onSubmitEditPackaging = async (newPackagingValues: PackagingFormData) => {
        toogleEditing();
        const data = await editPackaging({
            variables: {
                input: {
                    projectId: projectId,
                    packagingId: packaging.id,
                    packagingInfo: newPackagingValues
                }
            }
        });
        if (data?.data?.updatePackaging) {
            const newProject = data.data.updatePackaging;
            if (updateProject) updateProject(newProject);
        }
    }
    const handleDuplicate = async() => {
        const data = await duplicatePackaging();
        if (data?.data?.duplicatePackaging) {
            const newProject = data.data.duplicatePackaging;
            if (updateProject) updateProject(newProject);
        }
    }
    const handleDelete = async() => {
        const data = await deletePackaging();
        if (data?.data?.deletePackaging) {
            const newProject = data.data.deletePackaging;
            if (updateProject) updateProject(newProject);
        }
    }
    const toogleEditing = () => {
        setIsEditing(!isEditing);
    }
    return (
    <article className='m-0 p-2 border-2 border-gray-200 gap-4 rounded'>
        {isEditing
        ? (<PackagingForm packaging={packaging} onSubmit={onSubmitEditPackaging} onClose={toogleEditing} />)
        : (
            <>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <h2 className='text-small font-bold'>Name: {packaging.name}</h2>
                    {canBeEdited && (
                        <div className='flex gap-2 justify-end'>
                            <button onClick={handleDuplicate} className='text-sm text-blue-300 border-blue-200 hover:border-transparent hover:bg-blue-700 hover:text-white py-1 px-2 rounded'>
                                <Copy />
                            </button>
                            <button onClick={toogleEditing} className='text-sm text-green-300 border-green-200 hover:border-transparent hover:bg-green-700 hover:text-white py-1 px-2 rounded'>
                                <EditPencil />
                            </button>
                            <button onClick={handleDelete} className='text-sm text-red-300 border-red-200 hover:border-transparent hover:bg-red-700 hover:text-white py-1 px-2 rounded'>
                                <Trash />
                            </button>
                        </div>
                    )}
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
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
                <h3 className='flex items-start font-bold mt-4 px-2'>
                    Components:
                    <button onClick={() => setIsOpenCreateComponent(true)}>
                        <Plus />
                    </button>
                </h3>
                <ul className='w-full p-2 gap-4 flex flex-col'>
                    {isOpenCreateComponent 
                    ? (<ComponentForm onSubmit={onSubmitCreateComponent} onClose={() => setIsOpenCreateComponent(false)} />)
                    : <>
                        {packaging.components?.map((component : Component) => (
                            <li key={component.id}>
                                <ComponentCard component={component} projectId={projectId} packagId={packaging.id} updateProject={updateProject} />
                            </li>
                        ))}          
                    </> 
                    }
                </ul>
            </>
        )}
    </article>
  );
};