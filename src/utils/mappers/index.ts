import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import formatPrice from 'utils/format-price'

export const bannerMapper = (banners: QueryHome_banners[]) =>
  banners.map((banner) => ({
    img: banner.image?.url,
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
        img: game.cover?.url,
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
        backgroundImage: highlight.background?.url,
        floatImage: highlight.floatImage?.url
      }
    : []

export const cartMapper = (games: QueryGames_games[] | undefined) => {
  return games
    ? games?.map((game) => ({
        id: game.id,
        img: game.cover?.url,
        price: formatPrice(game.price),
        title: game.name
      }))
    : []
}
