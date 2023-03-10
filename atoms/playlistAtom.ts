import { atom } from "recoil";

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '5MbY70eVFBTEccjpMezray' // Mike + Dru Covers
})

export const playlistState = atom({
  key: 'playlistState',
  default: undefined as SpotifyApi.SinglePlaylistResponse | undefined
})