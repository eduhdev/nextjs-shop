import Link from 'next/link'

import { Favorite } from '@styled-icons/material-outlined/Favorite'
import { FavoriteBorder } from '@styled-icons/material-outlined/FavoriteBorder'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'

import Button from 'components/Button'
import Ribbon, { RibbonColors } from 'components/Ribbon'

import * as S from './styles'
import formatPrice from 'utils/format-price'

export type GameCardProps = {
  slug: string
  title: string
  developer: string
  img: string
  price: number
  promotionalPrice?: number
  favorite?: boolean
  onFav?: () => void
  ribbon?: string
  ribbonColor?: RibbonColors
}

const GameCard = ({
  title,
  developer,
  img,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor,
  slug,
  onFav
}: GameCardProps) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon size="small" color={ribbonColor}>
        {ribbon}
      </Ribbon>
    )}
    <Link href={`game/${slug}`} passHref>
      <S.ImageBox>
        <img src={img} alt={title} />
      </S.ImageBox>
    </Link>
    <S.Content>
      <Link href={`game/${slug}`} passHref>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.Developer>{developer}</S.Developer>
        </S.Info>
      </Link>
      <S.FavButton role="button" onClick={onFav}>
        {favorite ? (
          <Favorite aria-label="Remove from Wishlist" />
        ) : (
          <FavoriteBorder aria-label="Add to Wishlist" />
        )}
      </S.FavButton>
      <S.BuyBox>
        {!!promotionalPrice && (
          <S.Price isPromotional>{formatPrice(price)}</S.Price>
        )}
        <S.Price>
          {price === 0 ? 'FREE' : formatPrice(promotionalPrice || price)}
        </S.Price>
        <Button icon={<AddShoppingCart />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
