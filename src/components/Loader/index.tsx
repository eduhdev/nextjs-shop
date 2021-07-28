import styled, { css } from 'styled-components'
import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'

const Load = styled(LoaderAlt)`
  ${({ theme }) => css`
    height: 50px;
    width: 50px;
    color: ${theme.colors.secondary};
    animation: spin 2s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`

const LoadContent = styled.div`
  display: flex;
  justify-content: center;
`

const Loader = () => (
  <LoadContent aria-label="Loading">
    <Load />
  </LoadContent>
)

export default Loader
