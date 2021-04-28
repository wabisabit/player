import React from 'react'
import { PlaybackState, Song } from '../types'

export const initialValue = {
  state: PlaybackState.PAUSED,
  setState: (state: PlaybackState) => {},
  loadedSong: null as Song | null,
  togglePlayback: (song: Song) => {},
}

export const PlaybackContext = React.createContext<typeof initialValue>(
  initialValue
)
