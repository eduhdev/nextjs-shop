import { useRouter } from 'next/dist/client/router'
import { GetStaticProps } from 'next'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAMES, QUERY_GAMES_BY_SLUG } from 'graphql/queries/games'

import { initializeApollo } from 'utils/apollo'
import Game, { GameTemplateProps } from 'templates/Game'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from 'graphql/generated/QueryUpcoming'
import { QUERY_UPCOMING } from 'graphql/queries/upcoming'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Game {...props} />
}

// gerar em build time (/game/bla, /bame/foo ...)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 15 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAMES_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const {
    data: { recommended }
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcoming } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: { date: TODAY }
  })

  const game = data.games[0]

  return {
    revalidate: 60,
    props: {
      slug: params?.slug,
      cover: game.cover?.src || '',
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: image.src,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: 'BR0',
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.sections?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcoming.sections?.upcomingGames?.highlight
      ),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  }
}
