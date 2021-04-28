import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders app title', () => {
  render(<App />)
  const headerText = screen.getByText(/challenge player/i)
  expect(headerText).toBeInTheDocument()
})
