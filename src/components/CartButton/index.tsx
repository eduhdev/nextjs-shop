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
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove from Cart" />
        ) : (
          <AddShoppingCart aria-label="Add to Cart" />
        )
      }
      size={size}
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default CartButton
