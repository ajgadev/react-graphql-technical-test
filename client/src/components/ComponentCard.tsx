import { Plus } from "../icons/plus";
import { Component, Layer, Project, LayerFormData, ComponentFormData } from "../type";
import { LayerCard } from "./LayerCard";
import { useState } from "react";
import { LayerForm } from "./LayerForm";
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_LAYER } from "../graphql/mutationConsts";
import { Copy } from "../icons/copy";
import { Trash } from "../icons/trash";
import { EditPencil } from "../icons/edit_pencil";
import { MUTATION_DUPLICATE_COMPONENT, MUTATION_DELETE_COMPONENT, MUTATION_UPDATE_COMPONENT } from "../graphql/componentConsts";
import { ComponentForm } from "./ComponentForm";

export const ComponentCard = ({ component, projectId = '', packagId = '', updateProject }: { component: Component, projectId?: string, packagId?: string, updateProject?: (project: Project) => void }) => {
    // Create a new layer
    const [isOpenCreateLayer, setIsOpenCreateLayer] = useState(false);
    const [createLayer] = useMutation(MUTATION_CREATE_LAYER);
    const onSubmitCreateLayer = async (newLayerValues: LayerFormData)  => {
        setIsOpenCreateLayer(false);
        const data = await createLayer({
            variables: {
                input: {
                    projectId: projectId,
                    packagingId: packagId,
                    componentId: component.id,
                    layerInfo: newLayerValues
                }
            }
        });
        if (data?.data?.createLayer) {
            const newProject = data.data.createLayer;
            if (updateProject) updateProject(newProject);
        }
    }
    // End Create a new layer
    const canBeEdited = projectId && packagId;
    const [isEditing, setIsEditing] = useState(false);
    const [editComponent] = useMutation(MUTATION_UPDATE_COMPONENT);
    const [duplicateComponent] = useMutation(MUTATION_DUPLICATE_COMPONENT, {
        variables: {
            input: {
                componentId: component.id,
                projectId: projectId,
                packagingId: packagId
            }
    }});

    const [deleteComponent] = useMutation(MUTATION_DELETE_COMPONENT, {
        variables: {
            input: {
                componentId: component.id,
                projectId: projectId,
                packagingId: packagId
            }
        }
    });

    const handleDuplicate = async() => {
        const data = await duplicateComponent();
        if (data?.data?.duplicateComponent) {
            const newProject = data.data.duplicateComponent;
            if (updateProject) updateProject(newProject);
        }
    }

    const handleDelete = async() => {
        const data = await deleteComponent();
        if (data?.data?.deleteComponent) {
            const newProject = data.data.deleteComponent;
            if (updateProject) updateProject(newProject);
        }
    }

    const toogleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleSubmitEdit = async (componentValues: ComponentFormData) => {
        toogleEditing();
        const data = await editComponent({
            variables: {
                input: {
                    componentId: component.id,
                    projectId: projectId,
                    packagingId: packagId,
                    componentInfo: componentValues
                }
            }
        });
        if (data?.data?.updateComponent) {
            const newProject = data.data.updateComponent;
            if (updateProject) updateProject(newProject);
        }
    }

    return (
        <div className='border-2 border-blue-200 rounded p-2 m-0'>
            {isEditing
            ? (<ComponentForm component={component} onSubmit={handleSubmitEdit} onClose={toogleEditing} />)
            : (
                <>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <h2 className='text-small font-bold'>Name: {component.name}</h2>
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
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div className='flex flex-col'>
                            <span><strong>Weight:</strong> {component.weight} g</span>
                            <span><strong>Opacity:</strong> {component.opacity}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span><strong>Type:</strong> {component.componentType}</span>
                            <span><strong>Coverage:</strong> {component.coverage} %</span>
                        </div>
                    </div>
                    <h3 className='flex items-start font-bold mt-4'>
                        Layers:
                        <button onClick={() => setIsOpenCreateLayer(true)}>
                            <Plus />
                        </button>
                    </h3>
                    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {component.layers?.map((layer : Layer) => (
                            <li key={layer.id} className='flex flex-col'>
                                <LayerCard layer={layer} projectId={projectId} packagId={packagId} componentId={component.id} updateProject={updateProject} />
                            </li>
                        ))}
                        {isOpenCreateLayer && (
                            <LayerForm onSubmit={onSubmitCreateLayer} onClose={() => setIsOpenCreateLayer(false)}/>
                        )}
                    </ul>
                </>
            )}
        </div>

    );
}