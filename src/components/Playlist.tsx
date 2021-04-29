import { Howl, Howler } from 'howler'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NotificationContext } from '../contexts/NotificationContext'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { getSongs } from '../services'
import { PlaybackState, Song } from '../types'
import Track from './Track'

const LOADING_STATE_DELAY = 1000

let sound: Howl
let loadingTimeoutId: number

function Playlist() {
  const { setNotification } = useContext(NotificationContext)
  const [songs, setSongs] = useState([] as Song[])
  const [currentSong, setCurrentSong] = useState(null as Song | null)
  const [playbackState, setPlaybackState] = useState(PlaybackState.PAUSED)

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedSongs = await getSongs()
        setSongs(fetchedSongs)
      } catch (err) {
        setNotification(`Couldn't load song list. We're working on a solution.`)
      }
    })()
  }, [setNotification])

  useEffect(() => {
    return () => {
      clearTimeout(loadingTimeoutId)
    }
  }, [])

  const rewindNearEnd = () => {
    const remainingTime = sound.duration() - (sound.seek() as number)
    if (remainingTime < 1) {
      sound.seek(0)
    }
  }

  const loadSong = (path: string) => {
    sound = new Howl({
      src: [path],
      onplay: () => {
        clearTimeout(loadingTimeoutId)
        setPlaybackState(PlaybackState.PLAYING)
      },
      onloaderror: (id, message) => {
        if (message === 'Decoding audio data failed.') {
          return // This is a false load error caused by howler.js
        }
        clearTimeout(loadingTimeoutId)
        setPlaybackState(PlaybackState.PAUSED)
        setNotification(
          `The song is not available for playback. We're working on a solution.`
        )
      },
      onplayerror: () => {
        clearTimeout(loadingTimeoutId)
        setPlaybackState(PlaybackState.PAUSED)
        setNotification(`Couldn't play the song. Try a different browser.`)
      },
      onend: () => setPlaybackState(PlaybackState.PAUSED),
    })
  }

  const toggleCurrentSongPlayback = () => {
    if (playbackState === PlaybackState.LOADING) {
      setPlaybackState(PlaybackState.PAUSED)
      sound.stop()
    } else if (playbackState === PlaybackState.PLAYING) {
      clearTimeout(loadingTimeoutId)
      setPlaybackState(PlaybackState.PAUSED)
      sound.pause()
    } else {
      setPlaybackState(PlaybackState.PLAYING)
      rewindNearEnd()
      sound.play()
    }
  }

  const playDifferentSong = (song: Song) => {
    if (
      playbackState === PlaybackState.PLAYING ||
      playbackState === PlaybackState.LOADING
    ) {
      Howler.unload()
    }

    loadingTimeoutId = (setTimeout(() => {
      setPlaybackState(PlaybackState.LOADING)
    }, LOADING_STATE_DELAY) as unknown) as number

    setPlaybackState(PlaybackState.PLAYING)
    setCurrentSong(song)

    loadSong(song.music_file_path)

    sound.play()
  }

  const togglePlayback = (song: Song) => {
    clearTimeout(loadingTimeoutId)
    const isCurrent = currentSong?.id === song.id

    try {
      if (isCurrent) {
        toggleCurrentSongPlayback()
      } else {
        playDifferentSong(song)
      }
    } catch (err) {
      // TODO Report error
      setNotification(
        `There was a problem playing the song. We're working on a solution`
      )
    }
  }

  return (
    <PlaybackContext.Provider
      value={{
        loadedSong: currentSong,
        togglePlayback,
        state: playbackState,
        setState: setPlaybackState,
      }}
    >
      <Container>
        {songs.map((song) => (
          <Track key={song.id} song={song} />
        ))}
      </Container>
    </PlaybackContext.Provider>
  )
}

const Container = styled.ul`
  width: 100%;
  padding: 0;
  background-color: #242933;
`

export default Playlist
