import { atom } from "recoil";

export const currentSongIdState = atom({
  key: 'currentSongIdState',
  default: null as string | null
});

export const isSongPlayingState = atom({
  key: 'isSongPlayingState',
  default: false
});

export const currentSongState = atom({
  key: 'currentSongState',
  default: null as SpotifyApi.CurrentlyPlayingResponse | null
});