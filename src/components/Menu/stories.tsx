import { Story, Meta } from '@storybook/react/types-6-0'
import Menu, { MenuProps } from '.'

export default {
  title: 'Menu',
  component: Menu,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'pj-dark'
    }
  }
} as Meta

export const Default: Story<MenuProps> = (args) => <Menu {...args} />

export const Logged: Story<MenuProps> = (args) => (
  <Menu username="Eduardo" {...args} />
)
