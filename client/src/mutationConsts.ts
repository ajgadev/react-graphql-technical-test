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