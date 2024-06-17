import { Plus } from "../icons/plus";
import { Component, Layer, Project, LayerFormData } from "../type";
import { LayerCard } from "./LayerCard";
import { useState } from "react";
import { LayerForm } from "./LayerForm";
import { useMutation } from "@apollo/client";
import { MUTATION_CREATE_LAYER } from "../mutationConsts";

export const ComponentCard = ({ component, projectId = '', packagId = '', updateProject }: { component: Component, projectId?: string, packagId?: string, updateProject?: (project: Project) => void }) => {
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
    return (
        <div className='border-2 border-blue-200 rounded p-2 m-0'>
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
        </div>
    );
}