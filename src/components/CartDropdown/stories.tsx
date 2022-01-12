import { Story, Meta } from '@storybook/react/types-6-0'
import CartDropdown from '.'
import items from 'components/CartList/mock'

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  args: {
    items: []
  },
  parameters: {
    backgrounds: {
      default: 'pj-dark'
    }
  }
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
)

Default.args = {
  quantity: items.length,
  items,
  total: 'R$ 300,00'
}

export const Empty: Story = () => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)
