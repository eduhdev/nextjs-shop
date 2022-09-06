import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Email, CheckCircleOutline } from '@styled-icons/material-outlined'
import Button from 'components/Button'

import TextField from 'components/TextField'
import { FormWrapper, FormLoading, FormSuccess } from 'components/Form'
import * as S from './styles'
import { FieldErrors, forgotValidate } from 'utils/validations'
import { ErrorOutline } from 'styled-icons/material'

const FormForgotPassword = () => {
  const { query } = useRouter()
  const [success, setSuccess] = useState(false)
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const [values, setValues] = useState({
    email: (query.email as string) || ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.email) {
      setValues({ email: query.email as string })
    }
  }, [query])

  const handleInput = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setFieldError({})

    const errors = forgotValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )

    const data = await response.json()

    if (data.error) {
      setFieldError({ invalid: data.message[0].messages[0].message })
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an email!
        </FormSuccess>
      ) : (
        <form onSubmit={handleSubmit}>
          {fieldError?.invalid && (
            <S.Error>
              <ErrorOutline size={16} /> {fieldError.invalid}
            </S.Error>
          )}
          <TextField
            name="email"
            placeholder="Email"
            type="text"
            error={fieldError.email}
            initialValue={values.email as string}
            icon={<Email />}
            onInputChange={(v) => handleInput('email', v)}
          />

          <Button disabled={loading} type="submit" size="large" fullWidth>
            {loading ? <FormLoading /> : 'Send email'}
          </Button>
        </form>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
