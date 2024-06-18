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
    opacity: string;
    position: number;
    colour?: string | null;
    colourant?: string | null;
    componentType?: string | null;
    coverage?: number | null;
    layers?: Layer[];
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

interface LayerFormData {
    density: number;
    layerType: string;
    name: string;
    materialKey: string;
    visibleOuterLayer: boolean;
    weight: number;
}

interface ComponentFormData {
    name: string;
    opacity: string;
    colour?: string;
    colourant?: string;
    componentType?: string;
    coverage?: number;
}

interface PackagingFormData {
    name?: string;
    packagingType:? string;
    width?: number;
    length?: number;
    height?: number;
    volume?: number;
}

export enum PackagingType {
    _TYPE_BOTTLE = "TYPE_BOTTLE",
    type__cup_with_lid = "TYPE_CUP_WITH_LID",
    type_bag = "TYPE_BAG"
}

export enum ComponentType {
    _TYPE_BOTTLE = "TYPE_BOTTLE",
    _TYPE_CLOSURE = "_TYPE_CLOSURE",
    _TYPE_LID = "TYPE_LID",
    _TYPE_LABEL = "_TYPE_LABEL",
    type_bag = "TYPE_BAG",
    type__cup_with_lid = "TYPE_CUP_WITH_LID"
}

export enum LayerType {
    BASE_MATERIAL = "BASE_MATERIAL",
    ADHESIVE = "ADHESIVE"
}

export enum MaterialKey {
    PET_A = "PET_A",
    PP = "PP",
    LDPE = "LDPE",
    ADHESIVE = "ADHESIVE",
    AL = "AL",
    EVOH = "EVOH"
}

export enum Opacity {
    OPACITY_TRANSPARENT = "OPACITY_TRANSPARENT",
    OPACITY_OPAQUE = "OPACITY_OPAQUE"
}