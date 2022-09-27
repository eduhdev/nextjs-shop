import formatPrice from 'utils/format-price'

import Heading from 'components/Heading'
import Ribbon from 'components/Ribbon'
import * as S from './styles'
import CartButton from 'components/CartButton'
import WishlistButton from 'components/WishlistButton'

export type GameInfoProps = {
  id: string
  title: string
  description: string
  price: number
}

const GameInfo = ({ id, title, description, price }: GameInfoProps) => {
  return (
    <S.Wrapper data-cy="game-info">
      <Heading color="black" lineBottom>
        {title}
      </Heading>

      <Ribbon color="secondary">{formatPrice(price)}</Ribbon>

      <S.Description>{description}</S.Description>

      <S.ButtonWrapper>
        <CartButton id={id} size="large" hasText />
        <WishlistButton id={id} hasText size="large" />
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default GameInfo
