import { useQueryGames } from 'graphql/queries/games'
import { useRouter } from 'next/dist/client/router'
import { ParsedUrlQueryInput } from 'querystring'

import Base from 'templates/Base'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

import ExploreSidebar, { ItemProps } from 'components/ExploreSideBar'
import GameCard from 'components/GameCard'
import { Grid } from 'components/Grid'
import Loader from 'components/Loader'

import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'

import * as S from './styles'
import Empty from 'components/Empty'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  const hasMoreGames =
    (data?.games.length || 0) < (data?.gamesConnection?.values?.length || 0)

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({ pathname: '/games', query: items })
    return
  }

  const handleShowMore = () => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } })
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
          items={filterItems}
          onFilter={handleFilter}
        />

        <section>
          <>
            <Grid>
              {data?.games.map((game) => (
                <GameCard
                  {...game}
                  key={game.name}
                  title={game.name}
                  developer={game.developers[0].name}
                  img={`${game.cover?.url}`}
                />
              ))}
            </Grid>
            {loading && <Loader />}
            {!loading && hasMoreGames && (
              <S.ShowMore role="button" onClick={handleShowMore}>
                <p>Show More</p>
                <ArrowDown size={35} />
              </S.ShowMore>
            )}
          </>
          {!loading && !data?.games.length && (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
              hasLink
            />
          )}
        </section>
      </S.Main>
    </Base>
  )
}

export default GamesTemplate
