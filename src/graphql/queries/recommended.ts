import gql from 'graphql-tag'
import { GameFragment } from 'graphql/fragments/game'
import { HighlightFragment } from 'graphql/fragments/highlight'

export const QUERY_RECOMMENDED = gql`
  query QueryRecommended {
    recommended {
      section {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }
    }
  }

  ${GameFragment}
  ${HighlightFragment}
`
