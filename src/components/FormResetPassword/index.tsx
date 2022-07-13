import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { Lock } from '@styled-icons/material-outlined'
import Button from 'components/Button'

import TextField from 'components/TextField'
import { FormWrapper, FormLoading } from 'components/Form'
import * as S from './styles'
import { FieldErrors, resetValidate } from 'utils/validations'
import { ErrorOutline } from 'styled-icons/material'
import { signIn } from 'next-auth/client'

const FormResetPassword = () => {
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const [values, setValues] = useState({
    password: '',
    confirm_password: ''
  })
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = resetValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        })
      }
    )

    const data = await response.json()

    if (data.error) {
      setFieldError({ invalid: data.message[0].messages[0].message })
    } else {
      console.log('Success', data)
      signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/'
      })
    }

    setLoading(false)
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
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError.password}
          icon={<Lock />}
          onInputChange={(v) => handleInput('password', v)}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldError.confirm_password}
          icon={<Lock />}
          onInputChange={(v) => handleInput('confirm_password', v)}
        />

        <Button disabled={loading} type="submit" size="large" fullWidth>
          {loading ? <FormLoading /> : 'Reset Password'}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
