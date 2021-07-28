import Link from 'next/link'

import Heading from 'components/Heading'
import Logo from 'components/Logo'

import * as S from './styles'

const Footer = () => (
  <S.Wrapper>
    <Logo color="black" />

    <S.Content>
      <S.Column>
        <Heading lineColor="secondary" lineBottom size="small">
          Contact us
        </Heading>

        <nav aria-labelledby="contacts">
          <a href="mailto:sac@eduhdev.com">sac@eduhdev.com</a>
          <a href="tel:+55999834120">+55 43 99983-4120</a>
        </nav>
      </S.Column>

      <S.Column>
        <Heading lineColor="secondary" lineBottom size="small">
          Follow us
        </Heading>

        <nav aria-labelledby="social media">
          <a href="instagram.com" target="_blank" rel="noopener,noreferrer">
            Instagram
          </a>
          <a href="instagram.com" target="_blank" rel="noopener,noreferrer">
            Twitter
          </a>
          <a href="instagram.com" target="_blank" rel="noopener,noreferrer">
            Youtube
          </a>
          <a href="instagram.com" target="_blank" rel="noopener,noreferrer">
            Facebook
          </a>
        </nav>
      </S.Column>

      <S.Column>
        <Heading lineColor="secondary" lineBottom size="small">
          Links
        </Heading>

        <nav aria-labelledby="footer resources">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/">
            <a>Store</a>
          </Link>
          <Link href="/">
            <a>Search</a>
          </Link>
        </nav>
      </S.Column>
      <S.Column>
        <Heading lineColor="secondary" lineBottom size="small">
          Location
        </Heading>

        <span>Lorem Solum it</span>
        <span>Plaza Royal</span>
        <span>Plaza Royal</span>
      </S.Column>
    </S.Content>
    <S.Copyright>Game Store 2021 © All rights reserved.</S.Copyright>
  </S.Wrapper>
)

export default Footer
