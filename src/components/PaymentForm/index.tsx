import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Heading from 'components/Heading'
import * as S from './styles'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline } from 'styled-icons/material'
import { useCart } from 'hooks/use-cart'
import { createPayment, createPaymentIntent } from 'utils/stripe/methods'
import { FormLoading } from 'components/Form'

const isProduction = process.env.NODE_ENV === 'production'

export type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const { push } = useRouter()

  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    setFreeGames(false)
    async function setPaymentMode() {
      if (items.length) {
        const data = await createPaymentIntent({
          items,
          token: `${session.jwt}`
        })

        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: `${session.jwt}`
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)

    if (freeGames || isProduction) {
      saveOrder()

      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(` Payment failed: ${payload?.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      saveOrder(payload.paymentIntent)

      push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>

          {!isProduction &&
            (freeGames ? (
              <S.FreeGames>
                Only free games, click buy now and enjoy!
              </S.FreeGames>
            ) : (
              <>
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: { base: { fontSize: '16px' } }
                  }}
                  onChange={handleChange}
                />

                {error && (
                  <S.Error>
                    <ErrorOutline size={20} /> {error}
                  </S.Error>
                )}
              </>
            ))}
        </S.Body>
        <S.Footer>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={
              !isProduction &&
              (loading || (!freeGames && (!!error || disabled)))
            }
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
