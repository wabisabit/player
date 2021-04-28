export type Song = {
  id: string
  name: string
  cover_image_path: string
  cover_image_aspect_ratio: string
  music_file_path: string
  music_file_mimetype: string
}

export enum PlaybackState {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}
