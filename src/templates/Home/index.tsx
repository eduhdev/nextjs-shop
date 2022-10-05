import { BannerProps } from 'components/Banner'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

import BannerSlider from 'components/BannerSlider'
import Container from 'components/Container'

import * as S from './styles'
import Showcase from 'components/Showcase'
import Base from 'templates/Base'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGamesTitle: string
  newGames: GameCardProps[]
  mostPopularGamesTitle: string
  mostPopularHighlight: HighlightProps
  mostPopularGames: GameCardProps[]
  upcomingGamesTitle: string
  upcomingGames: GameCardProps[]
  upcomingHighlight: HighlightProps
  freeGamesTitle: string
  freeGames: GameCardProps[]
  freeHighlight: HighlightProps
}

const Home = ({
  banners,
  newGamesTitle,
  newGames,
  mostPopularGamesTitle,
  mostPopularHighlight,
  mostPopularGames,
  upcomingGamesTitle,
  upcomingGames,
  upcomingHighlight,
  freeGamesTitle,
  freeGames,
  freeHighlight
}: HomeTemplateProps) => (
  <>
    <Base>
      <Container>
        <S.SectionBanner>
          <BannerSlider items={banners} />
        </S.SectionBanner>
      </Container>

      <S.SectionNews>
        <Showcase title={newGamesTitle} games={newGames} color="black" />
      </S.SectionNews>

      <Showcase
        title={mostPopularGamesTitle}
        highlight={mostPopularHighlight}
        games={mostPopularGames}
        color="white"
      />

      <Showcase
        title={upcomingGamesTitle}
        highlight={upcomingHighlight}
        games={upcomingGames}
        color="white"
      />

      <Showcase
        title={freeGamesTitle}
        games={freeGames}
        highlight={freeHighlight}
        color="white"
      />
    </Base>
  </>
)

export default Home
