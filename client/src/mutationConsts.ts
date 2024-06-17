import {gql} from '@apollo/client'

// $input: { componentId: string , packagingId: string, projectId: string }
export const MUTATION_DUPLICATE_COMPONENT = gql`
    mutation DuplicateComponent($input: DuplicateComponentInput!) {
  duplicateComponent(input: $input) {
    id
    key
    name
    packagings {
      components {
        colour
        colourant
        id
        position
        componentType
        coverage
        name
        opacity
        weight
        layers {
          id
          density
          position
          layerType
          name
          materialKey
          visibleOuterLayer
          weight
          weightFraction
        }
      }
      id
      name
      position
      packagingType
      width
      length
      height
      volume
      weight
    }
  }
}`
// $input: { packagingId: string, projectId: string }
export const MUTATION_DUPLICATE_PACKAGING = gql`
    mutation DuplicatePackaging($input: DuplicatePackagingInput!) {
        duplicatePackaging(input: $input) {
            name
            id
            key
            packagings {
                name
                id
                components {
                    colour
                    colourant
                    componentType
                    coverage
                    id
                    layers {
                        density
                        id
                        layerType
                        materialKey
                        name
                        position
                        visibleOuterLayer
                        weight
                        weightFraction
                    }
                    name
                    opacity
                    position
                    weight
            }
            height
            length
            packagingType
            position
            volume
            weight
            width
        }
        name
        id
        key
    }
}
`
// {
//     "input": {
//       "projectId": string,
//       "packagingId": string,
//       "componentId": string,
//       "layerId": string
//     }
//   }
export const MUTATION_DUPLICATE_LAYER = gql`
    mutation DuplicateLayer($input: DuplicateLayerInput!) {
  duplicateLayer(input: $input) {
    id
    key
    name
    packagings {
      id
      components {
        id
        colour
        colourant
        position
        componentType
        coverage
        layers {
          id
          density
          position
          layerType
          name
          materialKey
          visibleOuterLayer
          weight
          weightFraction
        }
        name
        opacity
        weight
      }
      name
      position
      packagingType
      width
      length
      height
      volume
      weight
    }
  }
}
`
// {
//     "input": {
//       "projectId": string,
//       "packagingId": string,
//       "componentId": string,
//       "layerId": string
//     }
//   }
export const MUTATION_DELETE_LAYER = gql`
    mutation ReleteLayer($input: DuplicateLayerInput!) {
  removeLayer(input: $input) {
    id
    key
    name
    packagings {
      id
      components {
        id
        colour
        colourant
        position
        componentType
        coverage
        layers {
          id
          density
          position
          layerType
          name
          materialKey
          visibleOuterLayer
          weight
          weightFraction
        }
        name
        opacity
        weight
      }
      name
      position
      packagingType
      width
      length
      height
      volume
      weight
    }
  }
}
`
// {
// "input": {
//     "projectId": null,
//     "packagingId": null,
//     "componentId": null,
//     "newLayerId": null,
//     "layerInfo": {
//     "name": null,
//     "layerType": null,
//     "materialKey": null,
//     "visibleOuterLayer": null,
//     "density": null,
//     "weight": null
//     }
// }
// }
export const MUTATION_UPDATE_LAYER = gql`
mutation UpdateLayer($input: UpdateLayerInput!) {
  updateLayer(input: $input) {
    id
    key
    name
    packagings {
      id
      components {
        id
        colour
        colourant
        position
        componentType
        coverage
        layers {
          id
          density
          position
          layerType
          name
          materialKey
          visibleOuterLayer
          weight
          weightFraction
        }
        name
        opacity
        weight
      }
      name
      position
      packagingType
      width
      length
      height
      volume
      weight
    }
  }
}`