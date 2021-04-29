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

  const togglePlayback = (song: Song) => {
    const isCurrent = currentSong?.id === song.id

    if (isCurrent) {
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
        Howler.unload()
      }

      loadingTimeoutId = (setTimeout(() => {
        setPlaybackState(PlaybackState.LOADING)
      }, LOADING_STATE_DELAY) as unknown) as number

      setPlaybackState(PlaybackState.PLAYING)
      setCurrentSong(song)

      sound = new Howl({
        src: [song.music_file_path],
        onplay: () => {
          clearTimeout(loadingTimeoutId)
          setPlaybackState(PlaybackState.PLAYING)
        },
        onloaderror: () => {
          clearTimeout(loadingTimeoutId)
          setPlaybackState(PlaybackState.LOAD_ERROR)
          setNotification(
            `The song is not available for playback. We're working on a solution.`
          )
        },
        onplayerror: () => {
          clearTimeout(loadingTimeoutId)
          setPlaybackState(PlaybackState.PLAYBACK_ERROR)
          setNotification(`Couldn't play the song. Try a different browser.`)
        },
        onend: () => setPlaybackState(PlaybackState.PAUSED),
      })

      sound.play()
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
