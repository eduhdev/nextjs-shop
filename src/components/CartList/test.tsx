import { CartContextDefaultValues } from 'hooks/use-cart'
import { screen, render } from 'utils/test-utils'

import CartList from '.'
import mockItems from './mock'

describe('<CartList />', () => {
  it('should render the cart list', () => {
    const { container } = render(<CartList />, {
      cartProviderProps: {
        ...CartContextDefaultValues,
        items: mockItems,
        total: 'R$ 330,00'
      }
    })

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 330,00')).toHaveStyle({ color: '#F231A5' })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the cart list with button', () => {
    render(<CartList hasButton />, {
      cartProviderProps: {
        ...CartContextDefaultValues,
        items: mockItems,
        total: 'R$ 330,00'
      }
    })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render loading', () => {
    render(<CartList hasButton />, {
      cartProviderProps: {
        ...CartContextDefaultValues,
        loading: true
      }
    })

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  it('should render empty cart', () => {
    render(<CartList />)

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})
