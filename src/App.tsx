import React, { useState } from 'react'
import styled from 'styled-components'
import Notification from './components/Notification'
import Playlist from './components/Playlist'
import { NotificationContext } from './contexts/NotificationContext'

function App() {
  const [notification, setNotification] = useState('')

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <Container>
        <Playlist />
        <Notification />
      </Container>
    </NotificationContext.Provider>
  )
}

const Container = styled.div`
  height: 100%;
  background-color: #15181e;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App
