import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import heart from '../assets/heart.svg'
import { likeSong } from '../services'

const ICON_SIZE = 30
const HEART_BEAT_RATIO = 1.1

type Props = {
  id: string
}

function LikeButton(props: Props) {
  const { id } = props
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = async () => {
    try {
      setIsLiked(true)
      await likeSong(id)
    } catch (err) {
      // TODO show error
    }
  }

  return <Icon src={heart} onClick={handleLikeClick} $isActive={isLiked} />
}

const heartBeatAnimation = keyframes`
  0% {
    transform: scale(${HEART_BEAT_RATIO}) translateY(0)
  }
  10% {
    transform: scale(1) translateY(-2px)
  }
  20% {
    transform: scale(${HEART_BEAT_RATIO}) 
  }
  30% {
    transform: scale(1)
  }
  40% {
    transform: scale(${HEART_BEAT_RATIO}) translateY(-1px)
  }
  100% {
    transform: scale(1) translateY(0)
  }
`

const Icon = styled.img<{ $isActive: boolean }>`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: ${(props) => (props.$isActive ? 0.9 : 0.6)};
    transform: scale(${(props) => (props.$isActive ? 1 : HEART_BEAT_RATIO)});
  }
  transition: all 0.2s ease-in;
  ${(props) =>
    props.$isActive &&
    css`
      animation-name: ${heartBeatAnimation};
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-iteration-count: 1;
    `}
`

export default LikeButton
