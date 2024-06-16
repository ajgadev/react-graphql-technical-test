import {gql} from '@apollo/client'

export const PROJECT_INFO = gql`
query ProjectInfo($projectId: String!) {
  project(id: $projectId) {
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
      id
      key
  }
}
`