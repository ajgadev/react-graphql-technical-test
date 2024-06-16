import { Packaging } from "../type";
import { Component } from "../type";
import { ComponentCard } from "./ComponentCard";

export const PackagingCard = ({ packaging }: { packaging: Packaging }) => {
  return (
    <div className='m-0 p-2'>
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
                <li key={component.id}>
                    <ComponentCard component={component} />
                </li>
            ))}
        </ul>
    </div>
  );
};