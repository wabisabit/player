import React, { useState } from 'react'
import styled from 'styled-components'
import heart from '../assets/heart.svg'
import { likeSong } from '../services'

const ICON_SIZE = 30

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

  return <Icon src={heart} onClick={handleLikeClick} $isActive={isLiked} />
}

const Icon = styled.img<{ $isActive: boolean }>`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  padding: 10px;
  cursor: pointer;
`

export default LikeButton
