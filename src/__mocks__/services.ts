import { Song } from '../types'

export async function getSongs(): Promise<Song[]> {
  return new Promise((resolve) => {
    resolve([
      {
        id: '0',
        name: 'test song',
        cover_image_path: '',
        music_file_path: '',
      },
    ])
  })
}
