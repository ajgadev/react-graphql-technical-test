import { Layer } from "../type";

export const LayerCard = ({ layer }: { layer: Layer }) => {
    const truncatedWeightFraction = layer.weightFraction.toFixed(4);
    return (
        <div className='border-2 border-red-200 rounded p-2 flex flex-col'>
            <span><strong>Layer:</strong> {layer.name}</span>
            <span><strong>Weight:</strong> {layer.weight} g</span>
            <span><strong>Weight fraction:</strong> {truncatedWeightFraction} %</span>
            <span><strong>Density:</strong> {layer.density} g/cm3</span>
            <span><strong>Layer type:</strong> {layer.layerType}</span>
            <span><strong>Visible outerlayer:</strong> {layer.visibleOuterLayer ? 'Yes' : 'No'}</span>
        </div>
    )
}