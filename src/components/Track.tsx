import React from 'react'
import { Song } from '../types'
import LikeButton from './LikeButton'
import PlaybackButton from './PlaybackButton'

type Props = {
  song: Song
}

function Track(props: Props) {
  const { id, name, cover_image_path } = props.song

  return (
    <li>
      <span>{name}</span>
      <LikeButton id={id} />
      <PlaybackButton song={props.song} />
      <img src={cover_image_path} alt={`cover art for the song ${name}`} />
    </li>
  )
}

export default Track
