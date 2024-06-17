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

export const MUTATION_DELETE_COMPONENT = gql`
    mutation DeleteComponent($input: DuplicateComponentInput!) {
  removeComponent(input: $input) {
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

export const MUTATION_UPDATE_COMPONENT = gql`
mutation UpdateComponent($input: UpdateComponentInput!) {
  updateComponent(input: $input) {
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

export const MUTATION_CREATE_COMPONENT = gql`
    mutation addComponent($input: CreateComponentInput!) {
  addComponent(input: $input) {
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