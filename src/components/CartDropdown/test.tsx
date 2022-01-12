import { screen, render } from 'utils/test-utils'

import items from 'components/CartList/mock'
import CartDropdown from '.'
import { CartContextDefaultValues } from 'hooks/use-cart'

describe('<CartDropdown />', () => {
  beforeEach(() => {
    render(<CartDropdown />, {
      cartProviderProps: {
        ...CartContextDefaultValues,
        quantity: items.length,
        items,
        total: 'R$ 300,00'
      }
    })
  })
  it('should render <CartIcon /> and its badge', () => {
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument()
  })

  it('should render  Dropdown content with cart items and total', () => {
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()
    expect(screen.getByText(`${items[0].title}`)).toBeInTheDocument()
  })
})
