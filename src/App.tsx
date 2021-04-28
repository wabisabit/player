import React from 'react'
import styled from 'styled-components'
import Playlist from './components/Playlist'

function App() {
  return (
    <Container>
      <Playlist />
    </Container>
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
