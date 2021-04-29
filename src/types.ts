export type Song = {
  id: string
  name: string
  cover_image_path: string
  music_file_path: string
}

export enum PlaybackState {
  LOADING = 'LOADING',
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}
