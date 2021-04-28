import React from 'react'
import { Song } from './types'

function Track(props: Song) {
  const { name } = props

  return (
    <li>
      <span>{name}</span>
    </li>
  )
}

export default Track
