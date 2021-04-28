import React, { useState } from 'react'
import { likeSong } from './services'
import { Song } from './types'

function Track(props: Song) {
  const { id, name, cover_image_path } = props
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = () => {
    try {
      likeSong(id)
      setIsLiked(true)
    } catch (err) {
      // TODO show error
      // TODO report error
    }
  }

  return (
    <li>
      <span>{name}</span>
      <button onClick={handleLikeClick}>{isLiked ? 'LIKED' : 'LIKE'}</button>
      <img src={cover_image_path} alt={`cover art for the song ${name}`} />
    </li>
  )
}

export default Track
