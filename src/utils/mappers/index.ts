import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'

export const bannerMapper = (banners: QueryHome_banners[]) =>
  banners.map((banner) => ({
    img: `http://localhost:1337${banner.image?.url}`,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    })
  }))

export const gamesMapper = (games: QueryGames_games[] | null | undefined) =>
  games
    ? games.map((game) => ({
        id: game.id,
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover?.url}`,
        price: game.price,
        promotionalPrice: game.price
      }))
    : []

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined
) =>
  highlight
    ? {
        ...highlight,
        backgroundImage: `http://localhost:1337${highlight.background?.url}`,
        floatImage: `http://localhost:1337${highlight.floatImage?.url}`
      }
    : []
