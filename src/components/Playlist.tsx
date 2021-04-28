import { Howl } from 'howler'
import React, { useEffect, useState } from 'react'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { getSongs } from '../services'
import { PlaybackState, Song } from '../types'
import Track from './Track'

const LOADING_STATE_DELAY = 1000

let sound: Howl
let loadingTimeoutId: number

function Playlist() {
  const [songs, setSongs] = useState([] as Song[])
  const [loadedSong, setLoadedSong] = useState(null as Song | null)
  const [playbackState, setPlaybackState] = useState(PlaybackState.PAUSED)

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedSongs = await getSongs()
        setSongs(fetchedSongs)
      } catch (err) {
        // TODO show error
        // TODO report error
      }
    })()
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(loadingTimeoutId)
    }
  }, [])

  const togglePlayback = (song: Song) => {
    const isLoaded = loadedSong?.id === song.id

    if (isLoaded) {
      if (playbackState === PlaybackState.PLAYING) {
        setPlaybackState(PlaybackState.PAUSED)
        sound.pause()
      } else {
        setPlaybackState(PlaybackState.PLAYING)
        sound.play()
        // TODO go to start if less than a second left
      }
    } else {
      if (playbackState === PlaybackState.PLAYING) {
        sound.unload()
      }

      loadingTimeoutId = (setTimeout(() => {
        setPlaybackState(PlaybackState.LOADING)
      }, LOADING_STATE_DELAY) as unknown) as number

      setPlaybackState(PlaybackState.PLAYING)
      setLoadedSong(song)

      sound = new Howl({
        src: [song.music_file_path],
        onplay: () => {
          clearTimeout(loadingTimeoutId)
          setPlaybackState(PlaybackState.PLAYING)
        },
        onplayerror: () => {
          clearTimeout(loadingTimeoutId)
          setPlaybackState(PlaybackState.ERROR)
        },
        onend: () => setPlaybackState(PlaybackState.PAUSED),
      })

      sound.play()
    }
  }

  return (
    <PlaybackContext.Provider
      value={{
        loadedSong,
        togglePlayback,
        state: playbackState,
        setState: setPlaybackState,
      }}
    >
      <ul>
        {songs.map((song) => (
          <Track key={song.id} song={song} />
        ))}
      </ul>
    </PlaybackContext.Provider>
  )
}

export default Playlist
