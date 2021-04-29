import React, { useContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
import pause from '../assets/pause.svg'
import play from '../assets/play.svg'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { PlaybackState, Song } from '../types'
import { TrackContainer, trackHoverTransitionMixin } from './Track.style'

const ICON_SIZE = 50

type Props = {
  song: Song
}

function PlaybackButton(props: Props) {
  const { id } = props.song
  const { togglePlayback, state, loadedSong } = useContext(PlaybackContext)

  const isLoadedSong = id === loadedSong?.id
  const isPlaying = isLoadedSong && state === PlaybackState.PLAYING
  const isLoading = isLoadedSong && state === PlaybackState.LOADING

  return (
    <Container
      onClick={() => togglePlayback(props.song)}
      $isLoading={isLoading}
    >
      {isPlaying || isLoading ? (
        <PauseIcon src={pause} alt="pause" />
      ) : (
        <PlayIcon src={play} alt="play" />
      )}
    </Container>
  )
}

const loadingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  0% {
    opacity: 1;
  }
`

const Container = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.$isLoading &&
    css`
      animation-name: ${loadingAnimation};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    `}
`

const PauseIcon = styled.img`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  ${trackHoverTransitionMixin}
  transition-property: opacity;
`

const PlayIcon = styled(PauseIcon)`
  opacity: 0;
  ${TrackContainer}:hover & {
    opacity: 1;
  }
`

export default PlaybackButton
