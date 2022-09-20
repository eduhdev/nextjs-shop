import { PaymentIntent } from '@stripe/stripe-js'
import { CartItem } from 'hooks/use-cart'

type FetcherParams = {
  url: string
  token: string
  body: string
}

const fetcher = async ({ url, token, body }: FetcherParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body
  })

  return await response.json()
}

type PaymentIntentParams = {
  items: CartItem[]
  token: string
}

export const createPaymentIntent = async ({
  items,
  token
}: PaymentIntentParams) => {
  return fetcher({
    url: '/orders/create-payment-intent',
    body: JSON.stringify({ cart: items }),
    token
  })
}

type CreatePaymentParams = {
  items: CartItem[]
  paymentIntent?: PaymentIntent
  token: string
}

export const createPayment = ({
  items,
  paymentIntent,
  token
}: CreatePaymentParams) => {
  return fetcher({
    url: '/orders',
    body: JSON.stringify({
      cart: items,
      paymentIntent: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method
    }),
    token
  })
}
