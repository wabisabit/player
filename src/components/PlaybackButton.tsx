import React, { useContext } from 'react'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { PlaybackState, Song } from '../types'

type Props = {
  song: Song
}

function PlaybackButton(props: Props) {
  const { id } = props.song
  const { togglePlayback, state, loadedSong } = useContext(PlaybackContext)

  const buttonText = (() => {
    if (id === loadedSong?.id) {
      switch (state) {
        case PlaybackState.PAUSED:
          return 'PLAY'
        case PlaybackState.PLAYING:
          return 'PAUSE'
        case PlaybackState.LOADING:
          return 'LOADING'
        case PlaybackState.ERROR:
          return 'ERROR'
        default:
          return 'PLAY'
      }
    }

    return 'PLAY'
  })()

  return (
    <button onClick={() => togglePlayback(props.song)}>{buttonText}</button>
  )
}

export default PlaybackButton
