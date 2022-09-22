import { screen, render } from 'utils/test-utils'

import Highlight from '.'

const props = {
  title: 'Heading-1',
  subtitle: 'Heading-2',
  buttonLabel: 'Buy now',
  buttonLink: '/rdr2',
  backgroundImage: '/img/gta-san-andreas.jpg'
}

describe('<Highlight />', () => {
  it('should render headings and button', () => {
    render(<Highlight {...props} />)

    expect(
      screen.getByRole('heading', { name: /heading-1/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /heading-2/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<Highlight {...props} />)

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.backgroundImage
    )
  })

  it('should render float image', () => {
    render(<Highlight {...props} floatImage="/float-image.png" />)

    expect(screen.getByRole('img', { name: props.subtitle })).toHaveAttribute(
      'src',
      '/float-image.png'
    )
  })

  it('should render align right by default', () => {
    const { container } = render(
      <Highlight {...props} floatImage="/float-image.png" />
    )

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'floatImage content'"
    )
  })

  it('should render align right by default', () => {
    const { container } = render(
      <Highlight {...props} floatImage="/float-image.png" alignment="left" />
    )

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'content floatImage'"
    )
  })
})
