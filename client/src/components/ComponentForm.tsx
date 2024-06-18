import React, { useState } from 'react';
import { Component, ComponentFormData } from '../type';
export const ComponentForm = ({ component, onSubmit, onClose }: { component?: Component, onSubmit: (component: ComponentFormData) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState<ComponentFormData>({
        name: component?.name ?? '',
        opacity: component?.opacity ?? '',
        colour: component?.colour ?? '',
        colourant: component?.colourant ?? '',
        componentType: component?.componentType ?? '',
        coverage: component?.coverage ?? 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'number' ? parseFloat(value) : value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
            <label title="Name" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Name: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>

            <label title="Opacity" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Opacity: </strong>
                <select className="w-[70%] rounded border-2 border-gray-200 p-1" name="opacity" value={formData.opacity} onChange={handleChange}>
                    <option value=""></option>
                    <option value="OPACITY_TRANSPARENT">Transparent</option>
                    <option value="OPACITY_OPAQUE">Opaque</option>
                </select>
            </label>

            <label title="Component type" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Component type: </strong>
                <select className="w-[70%] rounded border-2 border-gray-200 p-1" name="componentType" value={formData.componentType} onChange={handleChange}>
                    <option value=""></option>
                    <option value="COMPONENT_TYPE_COMPONENT">Component</option>
                    <option value="COMPONENT_TYPE_PACKAGING">Packaging</option>
                </select>
            </label>

            <label title="Color" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Color: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="colour"
                    type="text"
                    value={formData.colour}
                    onChange={handleChange}
                />
            </label>

            <label title="Colourant" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Colourant: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="colourant"
                    type="text"
                    value={formData.colourant}
                    onChange={handleChange}
                />
            </label>

            <label title="Coverage" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Coverage: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="coverage"
                    type="number"
                    value={formData.coverage}
                    onChange={handleChange}
                />
            </label>

            <section className="flex gap-1 justify-end items-center">
                <button className="text-white border-2 bg-green-700 border-transparent hover:border-green-700 hover:bg-white hover:text-green-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                <button className="text-gray-300 border-2 border-gray-200 hover:border-transparent hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded" type="button" onClick={onClose}>Close</button>
            </section>
        </form>
    );
};