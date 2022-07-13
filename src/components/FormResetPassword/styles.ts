import styled, { css } from 'styled-components'

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
