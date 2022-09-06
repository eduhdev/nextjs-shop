import userEvent from '@testing-library/user-event'
import 'server.mock'
import { render, screen } from 'utils/test-utils'

import FormForgotPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({ query }))

const validEmail = 'valid@gmail.com'

describe('<FormForgotPassword />', () => {
  it('should render the form', () => {
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /send email/i })
    ).toBeInTheDocument()
  })

  it('should validate the email', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText(/Email/i), validEmail)

    userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(
      await screen.findByText(/You just received an email!/i)
    ).toBeInTheDocument()
  })

  it('should show an invalid email', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText(/Email/i), 'invalid')

    userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(
      await screen.findByText(/must be a valid email/i)
    ).toBeInTheDocument()
  })

  it('should show an inexistent email', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(
      screen.getByPlaceholderText(/Email/i),
      'false@email.com'
    )

    userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(
      await screen.findByText(/This email does not exist/i)
    ).toBeInTheDocument()
  })

  it('should autofill if comes via logged user', () => {
    query = { email: validEmail }
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/Email/i)).toHaveValue(validEmail)
  })
})
