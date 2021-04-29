import React, { useContext, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import heart from '../assets/heart.svg'
import { NotificationContext } from '../contexts/NotificationContext'
import { likeSong } from '../services'

const ICON_SIZE = 30
const HEART_BEAT_RATIO = 1.1

type Props = {
  id: string
}

function LikeButton(props: Props) {
  const { id } = props
  const [isLiked, setIsLiked] = useState(false)
  const notificationContext = useContext(NotificationContext)

  const handleLikeClick = async () => {
    setIsLiked(true)
    try {
      await likeSong(id)
    } catch (err) {
      notificationContext.setNotification(
        `There was a problem liking that song. We're working on a fix.`
      )
      // I commented this out so that you can see the full animation, since the api call always fails
      // setIsLiked(false)
    }
  }

  return (
    <button onClick={handleLikeClick} onTouchStart={(e) => e.stopPropagation()}>
      <Icon src={heart} $isActive={isLiked} alt="heart icon" role="button" />
    </button>
  )
}

const heartBeatAnimation = keyframes`
  0% {
    transform: scale(${HEART_BEAT_RATIO}) translateY(0)
  }
  10% {
    transform: scale(1) translateY(-2px)
  }
  20% {
    transform: scale(${HEART_BEAT_RATIO}) translateY(-3px)
  }
  30% {
    transform: scale(1) translateY(-2px)
  }
  40% {
    transform: scale(${HEART_BEAT_RATIO}) translateY(-2px)
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
  padding-left: 2em;
  cursor: pointer;
  &:hover {
    opacity: ${(props) => (props.$isActive ? 0.9 : 0.6)};
    transform: scale(${(props) => (props.$isActive ? 1 : HEART_BEAT_RATIO)});
  }
  transition: all 0.2s ease-in;
  transform-origin: 65% 50%;
  ${(props) =>
    props.$isActive &&
    css`
      animation-name: ${heartBeatAnimation};
      animation-duration: 1.5s;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-iteration-count: 1;
    `}
`

export default LikeButton
