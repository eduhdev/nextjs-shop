import { Story, Meta } from '@storybook/react/types-6-0'
import GameDetails, { GameDetailsProps } from '.'

import gameDetailMock from './mock'

export default {
  title: 'GameDetails',
  component: GameDetails,
  args: gameDetailMock,
  argTypes: {
    platforms: {
      control: {
        type: 'inline-check',
        options: ['linux', 'windows', 'mac']
      }
    },
    genres: {
      control: {
        type: 'inline-check',
        options: ['Action', 'Adventure', 'RPG']
      }
    },
    releaseDate: {
      control: 'date'
    }
  },
  parameters: {
    backgrounds: {
      default: 'pj-dark'
    }
  }
} as Meta

export const Default: Story<GameDetailsProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <GameDetails {...args} />
  </div>
)
