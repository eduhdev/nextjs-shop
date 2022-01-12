import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_newGames_highlight
} from 'graphql/generated/QueryHome'

import { bannerMapper, cartMapper, gamesMapper, highlightMapper } from '.'

describe('bannerMapper()', () => {
  it('should return the right format when banner is mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'Button label',
        link: '/button-label'
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as QueryHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: '/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'Button label',
        buttonLink: '/button-label',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return a empty array if no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the right format when games is mapped', () => {
    const games = {
      id: 'abc',
      name: 'Game Name',
      slug: 'game-name',
      cover: {
        url: '/image.jpg'
      },
      developers: [{ name: 'Developer Name' }],
      price: 30
    } as QueryGames_games

    expect(gamesMapper([games])).toStrictEqual([
      {
        id: 'abc',
        title: 'Game Name',
        slug: 'game-name',
        developer: 'Developer Name',
        img: `/image.jpg`,
        price: 30,
        promotionalPrice: 30
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return a empty array if no highlight', () => {
    expect(highlightMapper(null)).toStrictEqual([])
  })
  it('should return the right format when highlights is mapped', () => {
    const highlight = {
      title: 'title',
      subtitle: 'subtitle',
      background: {
        url: '/image.jpg'
      },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: {
        url: '/image.jpg'
      }
    } as QueryHome_sections_newGames_highlight

    expect(highlightMapper(highlight)).toMatchObject({
      title: 'title',
      subtitle: 'subtitle',
      backgroundImage: '/image.jpg',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'right',
      floatImage: '/image.jpg'
    })
  })
})

describe('cartMapper()', () => {
  it('should return empty array if no games', () => {
    expect(cartMapper(undefined)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const game = {
      id: '1',
      cover: {
        url: '/image.jpg'
      },
      name: 'game',
      price: 10
    } as QueryGames_games

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        img: 'http://localhost:1337/image.jpg',
        title: 'game',
        price: '$10.00'
      }
    ])
  })
})
