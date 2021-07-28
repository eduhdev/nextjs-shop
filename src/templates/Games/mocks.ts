import { QUERY_GAMES } from 'graphql/queries/games'

export const gamesMock = {
  request: { query: QUERY_GAMES, variables: { limit: 15, where: {} } },
  result: {
    data: {
      games: [
        {
          name: 'Dungeon Keeper Gold™',
          slug: 'dungeon-keeper',
          cover: {
            url: '/uploads/dungeon_keeper_556e256a5a.jpg'
          },
          developers: [{ name: 'Bullfrog Productions' }],
          price: 33.29,
          __typename: 'Game'
        }
      ]
    }
  }
}

export const fetchMoreMock = {
  request: {
    query: QUERY_GAMES,
    variables: { limit: 15, start: 1, where: {} }
  },
  result: {
    data: {
      games: [
        {
          name: 'Fetch More Game',
          slug: 'fetch-more',
          cover: {
            url: '/uploads/dungeon_keeper_556e256a5a.jpg'
          },
          developers: [{ name: 'Bullfrog Productions' }],
          price: 33.29,
          __typename: 'Game'
        }
      ]
    }
  }
}
