import { Song } from './types'

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await (response.json() as Promise<T>)
}

export async function getSongs(): Promise<Song[]> {
  const songs = await api<Song[]>(
    'https://api-stg.jam-community.com/song/trending'
  )

  return songs
}
