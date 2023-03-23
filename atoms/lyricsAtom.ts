import { atom } from "recoil";
import { Lyrics, TrackState } from "../types/types";

export const lyricsState = atom({
  key: 'lyricsState',
  default: null as Lyrics | null
});

export const lyricsTrackState = atom({
  key: 'lyricsTrackState',
  default: null as TrackState | null
})