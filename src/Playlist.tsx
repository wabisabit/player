import React, { useEffect, useState } from 'react'
import { getSongs } from './services'
import Track from './Song'
import { Song } from './types'

function Playlist() {
  const [songs, setSongs] = useState([] as Song[])

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedSongs = await getSongs()
        setSongs(fetchedSongs)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <ul>
      {songs.map((song) => (
        <Track key={song.id} {...song} />
      ))}
    </ul>
  )
}

export default Playlist
