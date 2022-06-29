import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { ErrorOutline } from 'styled-icons/material'
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined'
import { useMutation } from '@apollo/client'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { FieldErrors, signUpValidate } from 'utils/validations'

import { Error } from './styles'

const FormSignUp = () => {
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFieldError({
        invalid:
          err?.graphQLErrors[0]?.extensions?.exception.data.message[0]
            .messages[0].message
      }),
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
    }
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const errors = signUpValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }

    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    })
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        {fieldError?.invalid && (
          <Error>
            <ErrorOutline size={16} /> {fieldError.invalid}
          </Error>
        )}

        <TextField
          name="username"
          placeholder="UserName"
          type="text"
          error={fieldError.username}
          icon={<AccountCircle />}
          onInputChange={(v) => handleInput('username', v)}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError.email}
          icon={<Email />}
          onInputChange={(v) => handleInput('email', v)}
        />
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
          {loading ? <FormLoading /> : 'Sign up now'}
        </Button>
        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
