import React, { useContext } from 'react'
import styled from 'styled-components'
import pause from '../assets/pause.svg'
import play from '../assets/play.svg'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { PlaybackState, Song } from '../types'
import { TrackContainer } from './Track.style'

const ICON_SIZE = 50

type Props = {
  song: Song
}

function PlaybackButton(props: Props) {
  const { id } = props.song
  const { togglePlayback, state, loadedSong } = useContext(PlaybackContext)

  const isPlaying = id === loadedSong?.id && state === PlaybackState.PLAYING

  return (
    <Container onClick={() => togglePlayback(props.song)}>
      {isPlaying ? (
        <Icon src={pause} alt="pause" />
      ) : (
        <PlayIcon src={play} alt="play" />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Icon = styled.img`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  transition: opacity 0.2s ease-in-out;
`

const PlayIcon = styled(Icon)`
  opacity: 0;
  ${TrackContainer}:hover & {
    opacity: 1;
  }
`

export default PlaybackButton
