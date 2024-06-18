import {gql} from '@apollo/client'

// {
//     "input": {
//       "projectId": null,
//       "packagingId": null
//     }
//   }
export const MUTATION_DUPLICATE_PACKAGING = gql`
mutation DuplicatePackaging($input: DuplicatePackagingInput!) {
  duplicatePackaging(input: $input) {
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

// {
//     "input": {
//       "projectId": null,
//       "packagingId": null,
//       "packagingInfo": {
//         "name": null,
//         "packagingType": null,
//         "width": null,
//         "length": null,
//         "volume": null,
//         "height": null
//       }
//     }
//   }

export const MUTATION_UPDATE_PACKAGING = gql`
  mutation UpdatePackaging($input: UpdatePackagingInput!) {
    updatePackaging(input: $input) {
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

//   {
//     "input": {
//       "projectId": null,
//       "packagingId": null
//     }
//   }
export const MUTATION_DELETE_PACKAGING = gql`
mutation RemovePackaging($input: DuplicatePackagingInput!) {
  removePackaging(input: $input) {
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

// {
//     "input": {
//       "projectId": null,
//       "packagingInfo": {
//         "name": null,
//         "packagingType": null,
//         "width": null,
//         "length": null,
//         "height": null,
//         "volume": null
//       }
//     }
//   }
export const MUTATION_CREATE_PACKAGING = gql`
  mutation CreatePackaging($input: CreatePackagingInput!) {
    createPackaging(input: $input) {
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