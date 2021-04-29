import React, { useContext } from 'react'
import styled from 'styled-components'
import { PlaybackContext } from '../contexts/PlaybackContext'
import { Song } from '../types'
import LikeButton from './LikeButton'
import PlaybackButton from './PlaybackButton'
import { TrackContainer } from './Track.style'

const THUMBNAIL_SIZE = 100
const THUMBNAIL_SIZE_S = 70

type Props = {
  song: Song
}

function Track(props: Props) {
  const { id, name, cover_image_path } = props.song
  const { togglePlayback } = useContext(PlaybackContext)

  return (
    <TrackContainer onTouchStart={() => togglePlayback(props.song)}>
      <Wrapper>
        <ThumbnailContainer>
          <Thumbnail src={cover_image_path} alt={`cover art for the song `} />
          <PlaybackButton song={props.song} />
        </ThumbnailContainer>
        <Name>{name}</Name>
        <LikeButton id={id} />
      </Wrapper>
    </TrackContainer>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1em;
`

const Name = styled.span`
  font-size: ${22 / 16}rem;
  flex-grow: 1;
  @media screen and (max-width: 500px) {
    font-size: ${18 / 16}rem;
  }
`

const ThumbnailContainer = styled.div`
  position: relative;
  margin-right: 3em;
  @media screen and (max-width: 1100px) {
    margin-right: 2em;
  }
  @media screen and (max-width: 500px) {
    margin-right: 1em;
  }
`

const Thumbnail = styled.img`
  border-radius: 3px;
  width: ${THUMBNAIL_SIZE}px;
  height: ${THUMBNAIL_SIZE}px;
  @media screen and (max-width: 500px) {
    width: ${THUMBNAIL_SIZE_S}px;
    height: ${THUMBNAIL_SIZE_S}px;
  }
`

export default Track
