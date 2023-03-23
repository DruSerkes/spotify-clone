import { Lyrics, TrackState } from "../types/types";

const API_URL = 'https://api.musixmatch.com/ws/1.1/';
// const PROXY = `https://nextjs-cors-anywhere.vercel.app/api?`;

export const getLyricsForTrack = async (track_id: number, commontrack_id: number): Promise<{ message: { body: { lyrics: Lyrics } } }> => {
  try {
    const response = await fetch(`${API_URL}track.lyrics.get?track_id=${track_id}&commontrack_id=${commontrack_id}&apikey=${process.env.NEXT_PUBLIC_MUSIXMATCH_KEY}`);
    console.log({ response });

    return await response.json();
  } catch (e: any) {
    console.log(e);
    return e;
  }
}

export const searchForTrack = async (q_track: string, q_artist: string): Promise<{ message: { body: { track_list: TrackState[] } } }> => {
  try {
    const response = await fetch(`${API_URL}track.search?q_track=${q_track}&q_artist=${q_artist}&apikey=${process.env.NEXT_PUBLIC_MUSIXMATCH_KEY}`)
    console.log({ response });

    return await response.json();
  } catch (e: any) {
    console.log(e);
    return e;
  }
};
