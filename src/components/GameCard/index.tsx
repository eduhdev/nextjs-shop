import Image from 'next/image'
import Link from 'next/link'

import Ribbon, { RibbonColors } from 'components/Ribbon'

import * as S from './styles'
import formatPrice from 'utils/format-price'
import CartButton from 'components/CartButton'
import WishlistButton from 'components/WishlistButton'

export type GameCardProps = {
  id: string
  slug: string
  title: string
  developer: string
  img: string | undefined
  price: number
  promotionalPrice?: number
  favorite?: boolean
  ribbon?: string
  ribbonColor?: RibbonColors
}

const GameCard = ({
  id,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonColor,
  slug
}: GameCardProps) => (
  <S.Wrapper data-cy="game-card">
    {!!ribbon && (
      <Ribbon size="small" color={ribbonColor}>
        {ribbon}
      </Ribbon>
    )}
    <Link href={`game/${slug}`} passHref>
      <S.ImageBox>
        <Image src={img || '/default'} alt={title} layout="fill" />
      </S.ImageBox>
    </Link>
    <S.Content>
      <Link href={`game/${slug}`} passHref>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.Developer>{developer}</S.Developer>
        </S.Info>
      </Link>
      <S.FavButton>
        <WishlistButton id={id} />
      </S.FavButton>
      <S.BuyBox>
        {!!promotionalPrice && (
          <S.Price isPromotional>{formatPrice(price)}</S.Price>
        )}
        <S.Price>
          {price === 0 ? 'FREE' : formatPrice(promotionalPrice || price)}
        </S.Price>
        <CartButton id={id} />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
