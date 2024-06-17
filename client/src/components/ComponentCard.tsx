import { Component, Layer, Project } from "../type";
import { LayerCard } from "./LayerCard";

export const ComponentCard = ({ component, projectId = '', packagId = '', updateProject }: { component: Component, projectId?: string, packagId?: string, updateProject?: (project: Project) => void }) => {
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
            <h3 className='flex items-start font-bold mt-4'>Layers:</h3>
            <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {component.layers?.map((layer : Layer) => (
                    <li key={layer.id} className='flex flex-col'>
                        <LayerCard layer={layer} projectId={projectId} packagId={packagId} componentId={component.id} updateProject={updateProject} />
                    </li>
                ))}
            </ul>
        </div>
    );
}