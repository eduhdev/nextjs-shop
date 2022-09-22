import Link from 'next/link'

import Heading from 'components/Heading'
import Logo from 'components/Logo'

import * as S from './styles'

const Footer = () => (
  <S.Wrapper>
    <Logo color="black" />

    <S.Content>
      <S.Column>
        <Heading lineColor="secondary" lineBottom size="small" color="black">
          Contact us
        </Heading>

        <nav aria-labelledby="contacts">
          <a href="mailto:sac@eduhdev.com">sac@eduhdev.com</a>
          <a href="tel:+55999834120">+55 43 99983-4120</a>
        </nav>
      </S.Column>

      <S.Column>
        <Heading
          lineColor="secondary"
          lineBottom
          size="small"
          color="black"
          aria-labelledby="social media"
        >
          Follow us
        </Heading>

        <nav id="social-media">
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
        <Heading
          lineColor="secondary"
          lineBottom
          size="small"
          color="black"
          aria-labelledby="resources"
        >
          Links
        </Heading>

        <nav id="resources">
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
      <S.Column aria-label="contact">
        <Heading lineColor="secondary" lineBottom size="small" color="black">
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
