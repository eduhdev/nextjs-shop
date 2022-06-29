import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { Email, Lock } from '@styled-icons/material-outlined'
import Button from 'components/Button'

import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import * as S from './styles'
import { FieldErrors, signInValidate } from 'utils/validations'
import { ErrorOutline } from 'styled-icons/material'

const FormSignIn = () => {
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.url) {
      return push(result.url)
    }

    setLoading(false)

    setFieldError({ invalid: 'username or password is invalid' })
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        {fieldError?.invalid && (
          <S.Error>
            <ErrorOutline size={16} /> {fieldError.invalid}
          </S.Error>
        )}
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          icon={<Email />}
          onInputChange={(v) => handleInput('email', v)}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
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
