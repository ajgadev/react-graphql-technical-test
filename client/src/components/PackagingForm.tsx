import { Packaging, PackagingFormData } from "../type";
import { useState } from "react";

export const PackagingForm = ({ packaging, onSubmit, onClose }: { packaging?: Packaging, onSubmit: (packaging: PackagingFormData) => void, onClose: () => void }) => {
    const [packagingData, setPackagingData] = useState<PackagingFormData>({
        name: packaging?.name ?? '',
        packagingType: packaging?.packagingType ?? '',
        width: packaging?.width ?? 0,
        length: packaging?.length ?? 0,
        height: packaging?.height ?? 0,
        volume: packaging?.volume ?? 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setPackagingData({
                ...packagingData,
                [name]: checked
            });
        } else {
            setPackagingData({
                ...packagingData,
                [name]: type === 'number' ? parseFloat(value) : value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(packagingData);
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label title="Name" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Name: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="name"
                    type="text"
                    value={packagingData?.name ?? ''}
                    onChange={handleChange}
                />
            </label>

            <label title="Packaging Type" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Packaging Type: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="packagingType"
                    type="text"
                    value={packagingData?.packagingType ?? ''}
                    onChange={handleChange}
                />
            </label>

            <label title="Width" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Width: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="width"
                    type="number"
                    value={packagingData?.width ?? 0}
                    onChange={handleChange}
                />
            </label>

            <label title="Length" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Length: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="length"
                    type="number"
                    value={packagingData?.length ?? 0}
                    onChange={handleChange}
                />
            </label>

            <label title="Height" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Height: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="height"
                    type="number"
                    value={packagingData?.height ?? 0}
                    onChange={handleChange}
                />
            </label>

            <label title="Volume" className="flex gap-1 justify-center items-center">
                <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Volume: </strong>
                <input
                    className="w-[70%] rounded border-2 border-gray-200 p-1"
                    name="volume"
                    type="number"
                    value={packagingData?.volume ?? 0}
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