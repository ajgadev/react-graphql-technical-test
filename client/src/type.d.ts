export type Project = {
    __typename: string;
    name: string;
    key: string;
    id: string;
    packagings: Packaging[];
}

export type Packaging = {
    __typename: string;
    id: string;
    weight: number;
    name: string;
    position: number;
    packagingType: string;
    width: number | null;
    length: number | null;
    height: number | null;
    volume: number | null;
    components: Component[];
}

export type Component = {
    __typename: string;
    id: string;
    name: string;
    weight: number;
}

export type Layer = {
    __typename: string;
    id: string;
    density: number;
    position: number;
    layerType: string;
    name: string;
    materialKey: string;
    visibleOuterLayer: boolean;
    weight: number;
    weightFraction: number;
}