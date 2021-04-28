import React, { useState } from 'react'
import { likeSong } from '../services'

type Props = {
  id: string
}

function LikeButton(props: Props) {
  const { id } = props
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

  return <button onClick={handleLikeClick}>{isLiked ? 'LIKED' : 'LIKE'}</button>
}

export default LikeButton
