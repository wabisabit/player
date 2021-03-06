import { Song } from './types'

const baseUrl = 'https://api-stg.jam-community.com'

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await (response.json() as Promise<T>)
}

export async function getSongs(): Promise<Song[]> {
  try {
    const songs = await api<Song[]>(`${baseUrl}/song/trending`)

    return songs
  } catch (err) {
    // TODO Report error
    throw new Error(`Couldn't fetch song list`)
  }
}

export async function likeSong(id: string) {
  try {
    await api(
      `${baseUrl}/interact/like?apikey=${process.env.REACT_APP_API_KEY}`,
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
  } catch (err) {
    // TODO Report error
    throw new Error(`Song not likeable`)
  }
}
