import { Song } from './types'

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
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

export async function likeSong(id: string) {
  await api(
    `https://api-stg.jam-community.com/interact/like?apikey=${process.env.REACT_APP_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
}
