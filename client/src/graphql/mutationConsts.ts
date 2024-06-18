import {gql} from '@apollo/client'

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

export const MUTATION_CREATE_LAYER = gql`
    mutation addLayer($input: CreateLayerInput!) {
  addLayer(input: $input) {
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