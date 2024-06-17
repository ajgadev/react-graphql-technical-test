import { useEffect, useState } from "react";
import { Layer, LayerFormData } from "../type";

export const LayerForm = ({ layer ,onSubmit, onClose }: { layer?: Layer, onSubmit: (data: LayerFormData) => void, onClose: () => void }) => {   
  const [formData, setFormData] = useState<LayerFormData>({
    density: 0,
    layerType: "",
    name: "",
    materialKey: "",
    visibleOuterLayer: false,
    weight: 0
  });

  useEffect(() => {
    if (layer) {
      setFormData({
        ...formData,
        density: layer.density ?? 0,
        layerType: layer.layerType ?? '',
        name: layer.name ?? '',
        materialKey: layer.materialKey ?? '',
        visibleOuterLayer: layer.visibleOuterLayer ?? false,
        weight: layer.weight ?? 0
      });
    }
  }, [layer]);

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

        <label title="Weight" className="flex gap-1 justify-center items-center">
            <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Weight: </strong>
            <input
                className="w-[70%] rounded border-2 border-gray-200 p-1"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
            />
        </label>

        <label title="Density" className="flex gap-1 justify-center items-center">
            <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Density: </strong>
            <input
                className="w-[70%] rounded border-2 border-gray-200 p-1"
                name="density"
                type="number"
                value={formData.density}
                onChange={handleChange}
            />
        </label>
        
        <label title="Layer Type" className="flex gap-1 justify-center items-center">
            <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Layer Type: </strong>
            <select className="w-[70%] rounded border-2 border-gray-200 p-1" name="layerType" value={formData.layerType} onChange={handleChange}>
                <option value=""></option>
                <option value="BASE_MATERIAL">Base Material</option>
                <option value="ADHESIVE">Adhesive</option>
            </select>
        </label>
        
        <label title="Material Key" className="flex gap-1 justify-center items-center">
            <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Material Key: </strong>
            <select
                className="w-[70%] rounded border-2 border-gray-200 p-1"
                name="materialKey"
                value={formData.materialKey}
                onChange={handleChange}
            >
                <option value=""></option>
                <option value="PET_A">PET_A</option>
                <option value="PP">PP</option>
                <option value="LDPE">LDPE</option>
                <option value="ADHESIVE">ADHESIVE</option>
                <option value="AL">AL</option>
                <option value="EVOH">EVOH</option>
            </select>
        </label>

        <label title="Visible Outer Layer" className="flex gap-1 justify-center items-center">
            <strong className="w-[30%] overflow-hidden text-ellipsis text-nowrap">Visible Outer Layer: </strong>
            <input
                className="w-[70%] rounded border-2 border-gray-200 p-1"
                name="visibleOuterLayer"
                type="checkbox"
                checked={formData.visibleOuterLayer}
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
