import styled, { css } from 'styled-components'
import { lighten } from 'polished'

export const ForgetPassword = styled.a`
  ${({ theme }) => css`
    display: block;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    text-decoration: none;
    text-align: right;

    &:hover {
      color: ${lighten(0.3, theme.colors.black)};
    }
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  `}
`
