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
  PLAYBACK_ERROR = 'PLAYBACK_ERROR',
  LOAD_ERROR = 'LOAD_ERROR',
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}
