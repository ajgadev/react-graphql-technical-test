import { Layer, Project, LayerFormData } from "../type";
import { MUTATION_DUPLICATE_LAYER, MUTATION_DELETE_LAYER, MUTATION_UPDATE_LAYER } from "../mutationConsts";
// import { PROJECT_INFO } from '../queryConsts'
import { useMutation } from "@apollo/client";
import { EditPencil } from "../icons/edit_pencil";
import { Copy } from "../icons/copy";
import { Trash } from "../icons/trash";
import { useState } from "react";
import { LayerForm } from "./LayerForm";

export const LayerCard = ({ layer, projectId = '', packagId = '', componentId = '', updateProject }: { layer: Layer, projectId?: string, packagId?: string, componentId?: string, updateProject?: (project: Project) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const truncatedWeightFraction = layer.weightFraction?.toFixed(4) || 0;
    const canBeEdited = projectId && packagId && componentId;
    const [editLayer] = useMutation(MUTATION_UPDATE_LAYER);
    const [deleteLayer] = useMutation(MUTATION_DELETE_LAYER, {
        variables: {
            input: {
                layerId: layer.id,
                projectId: projectId,
                componentId: componentId,
                packagingId: packagId
            }
        }
    });
    const [duplicateLayer] = useMutation(MUTATION_DUPLICATE_LAYER, {
        variables: {
            input: {
                layerId:layer.id,
                projectId: projectId,
                componentId: componentId,
                packagingId: packagId
            }
        },
        // update: (cache, { data: { duplicateLayer } }) => {
        //     const project = cache.readQuery<{ project: Project }>({ query: PROJECT_QUERY, variables: { id: projectId } });
        //     const component = cache.readQuery<{ component: Component }>({ query: COMPONENT_QUERY, variables: { id: componentId } });
        //     const packag = cache.readQuery<{ packaging: Packaging }>({ query: PACKAGING_QUERY, variables: { id: packagId } });
        //     if (project && component && packag) {
        //         const newProject = {
        //             ...project,
        //             components: [...project.components, component],
        //             packagings: [...project.packagings, packag]
        //         }                
        //         cache.writeQuery({ query: PROJECT_QUERY, data: { project: newProject } });
        //         if (updateProject) updateProject(newProject);
        //     }
        // }
    });
    const handleDuplicate = async() => {
        const data = await duplicateLayer();
        if (data?.data?.duplicateLayer) {
            const newProject = data.data.duplicateLayer;
            if (updateProject) updateProject(newProject);
        }
    }
    const handleDelete = async() => {
        const data = await deleteLayer();
        if (data?.data?.deleteLayer) {
            const newProject = data.data.deleteLayer;
            if (updateProject) updateProject(newProject);
        }
    }

    const toogleEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleSubmitEdit = async (layerValues: LayerFormData) => {
        toogleEditing();
        const data = await editLayer({
            variables: {
                input: {
                    layerId: layer.id,
                    projectId: projectId,
                    componentId: componentId,
                    packagingId: packagId,
                    layerInfo: layerValues
                }
            }
        });
        if (data?.data?.updateLayer) {
            const newProject = data.data.updateLayer;
            if (updateProject) updateProject(newProject);
        }
    }
    
    return (
        <div className='border-2 border-red-200 rounded p-2 flex flex-col'>
            { isEditing
            ? (<LayerForm layer={layer} onSubmit={handleSubmitEdit} onClose={toogleEditing} />)
            : (
                <>
                    <span><strong>Layer:</strong> {layer.name}</span>
                    <span><strong>Weight:</strong> {layer.weight} g</span>
                    <span><strong>Weight fraction:</strong> {truncatedWeightFraction} %</span>
                    <span><strong>Density:</strong> {layer.density} g/cm3</span>
                    <span><strong>Layer type:</strong> {layer.layerType}</span>
                    <span><strong>Visible outerlayer:</strong> {layer.visibleOuterLayer ? 'Yes' : 'No'}</span>
                    {canBeEdited && (
                        <div className='flex gap-2 mt-4 justify-center'>
                            <button onClick={handleDuplicate} className='text-blue-300 border-2 border-blue-200 hover:border-transparent hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded'>
                                <Copy />
                            </button>
                            <button onClick={toogleEditing} className='text-green-300 border-2 border-green-200 hover:border-transparent hover:bg-green-700 hover:text-white font-bold py-2 px-4 rounded'>
                                <EditPencil />
                            </button>
                            <button onClick={handleDelete} className='text-red-300 border-2 border-red-200 hover:border-transparent hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded'>
                                <Trash />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}