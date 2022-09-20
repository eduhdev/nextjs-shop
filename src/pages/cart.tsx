import { GetServerSidePropsContext } from 'next'
import Cart, { CartProps } from 'templates/Cart'

import gamesMock from 'components/GameCardSlider/mock'
import higlightMock from 'components/Highlight/mock'
import protectedRoutes from 'utils/protected-routes'

export default function CartPage(props: CartProps) {
  return <Cart {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      recommendedGames: gamesMock,
      recommendedHighlight: higlightMock,
      session
    }
  }
}
