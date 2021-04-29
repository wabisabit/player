import { render } from '@testing-library/react'
import React from 'react'
import Playlist from './Playlist'

jest.mock('../services')

test('renders playlist', async () => {
  const { findByText } = render(<Playlist />)
  const element = await findByText(/test song/i)
  expect(element).toBeInTheDocument()
})
