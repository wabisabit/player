import styled, { css } from 'styled-components'

export const trackHoverTransitionMixin = css`
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
`

export const TrackContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #15181e;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  ${trackHoverTransitionMixin}
  transition-property: all;
`
