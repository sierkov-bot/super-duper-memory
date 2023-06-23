import { gql } from '@apollo/client'

// I was thinking to implement a modal to view more details about the
// character but gave up the idea.
export const GET_CHARACTER = gql`
query Character($characterId: ID!) {
  character(id: $characterId) {
    created
    gender
    id
    image
    location {
      name
    }
    name
    origin {
      name
    }
    species
    status
    type
    episode {
      name
    }
  }
}`

export const GET_CHARACTERS = gql`
query Characters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      id
      name
      status
      species
    }
    info {
      count
      pages
      prev
      next
    }
  }
}`
