import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { Email, Lock } from '@styled-icons/material-outlined'
import Button from 'components/Button'

import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import * as S from './styles'

const FormSignIn = () => {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result.url)
    }

    setLoading(false)

    console.log('email ou senha invalidos')
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          onInputChange={(v) => handleInput('email', v)}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          onInputChange={(v) => handleInput('password', v)}
        />
        <S.ForgetPassword href="#">Forgot your password?</S.ForgetPassword>
        <Button disabled={loading} type="submit" size="large" fullWidth>
          {loading ? <FormLoading /> : 'Sign in now'}
        </Button>
        <FormLink>
          Don’t have an account?
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
