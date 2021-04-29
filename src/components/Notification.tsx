import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { NotificationContext } from '../contexts/NotificationContext'

const FADE_OUT_DURATION_MS = 1000

let notificationTimeoutId: number
let notificationFadeTimeoutId: number

function Notification() {
  const { notification, setNotification } = useContext(NotificationContext)
  const [text, setText] = useState(notification)

  useEffect(() => {
    return () => {
      clearTimeout(notificationTimeoutId)
      clearTimeout(notificationFadeTimeoutId)
    }
  }, [])

  useEffect(() => {
    if (notification) {
      setText(notification)
    } else {
      notificationFadeTimeoutId = (setTimeout(() => {
        setText('')
      }, FADE_OUT_DURATION_MS) as unknown) as number
    }
    return () => clearTimeout(notificationFadeTimeoutId)
  }, [notification])

  useEffect(() => {
    if (notification) {
      notificationTimeoutId = (setTimeout(() => {
        setNotification('')
      }, 5000) as unknown) as number
    }
    return () => clearTimeout(notificationTimeoutId)
  }, [notification, setNotification])

  return (
    <Container $isActive={!!notification}>
      <NotificationText>{text}</NotificationText>
    </Container>
  )
}

const Container = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #29e1cb;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity ${FADE_OUT_DURATION_MS}ms;
`

const NotificationText = styled.p`
  color: #242933;
`

export default Notification
