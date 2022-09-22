import Button, { ButtonProps } from 'components/Button'
import { useCart } from 'hooks/use-cart'
import {
  AddShoppingCart,
  RemoveShoppingCart
} from 'styled-icons/material-outlined'

type CartButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const CartButton = ({
  id,
  size = 'small',
  hasText = false
}: CartButtonProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const ButtonText = isInCart(id) ? 'Remove from Cart' : 'Add to Cart'

  return (
    <Button
      aria-label={ButtonText}
      icon={isInCart(id) ? <RemoveShoppingCart /> : <AddShoppingCart />}
      size={size}
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default CartButton
