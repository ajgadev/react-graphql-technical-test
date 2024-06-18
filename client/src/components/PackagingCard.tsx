import { ComponentFormData, Packaging, Project } from "../type";
import { Component } from "../type";
import { ComponentCard } from "./ComponentCard";
import { Plus } from "../icons/plus";
import { useState } from "react";
import { ComponentForm } from "./ComponentForm";
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_COMPONENT } from "../graphql/componentConsts";

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
    return (
    <article className='m-0 p-2'>
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
        <h3 className='flex items-start font-bold mt-4'>
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
    </article>
  );
};