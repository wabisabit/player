import React from 'react'
import styled from 'styled-components'
import { Song } from '../types'
import LikeButton from './LikeButton'
import PlaybackButton from './PlaybackButton'
import { TrackContainer } from './Track.style'

const THUMBNAIL_SIZE = 100

type Props = {
  song: Song
}

function Track(props: Props) {
  const { id, name, cover_image_path } = props.song

  return (
    <TrackContainer>
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
`

const ThumbnailContainer = styled.div`
  position: relative;
  margin-right: 3em;
`

const Thumbnail = styled.img`
  border-radius: 3px;
  width: ${THUMBNAIL_SIZE}px;
  height: ${THUMBNAIL_SIZE}px;
`

export default Track
