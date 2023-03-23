import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { lyricsState } from "../atoms/lyricsAtom";
import { currentSongIdState } from "../atoms/songAtom";
import { REFRESH_ACCESS_TOKEN_ERROR } from "../vars/errors";
import { getLyricsForTrack, searchForTrack } from "./musixmatch";
import { spotifyApi } from "./spotify";

export const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) return;
    if (session?.error === REFRESH_ACCESS_TOKEN_ERROR) signIn();

    spotifyApi.setAccessToken(session.accessToken);
  }, [session])

  return spotifyApi;
};

export const useSong = () => {
  const spotify = useSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [song, setSong] = useState<SpotifyApi.SingleTrackResponse | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      if (!currentSongId || !spotify.getAccessToken()) return;

      try {
        const track = await spotify.getTrack(currentSongId);
        setSong(track.body);
      } catch (e) {
        console.log(e);
      }
    };

    fetchSong();
  }, [spotify, currentSongId]);

  return song;
};

export const useSongLyrics = () => {
  const song = useSong();
  const [lyrics, setLyrics] = useRecoilState(lyricsState);

  useEffect(() => {
    const fetchSongLyrics = async () => {
      if (!song) return;

      const trackResponse = await searchForTrack(song.name, song.artists[0].name);
      console.log({ trackResponse })
      if (!trackResponse?.body?.track_list?.length || trackResponse?.body?.track_list?.length === 0) return setLyrics(null);

      const track = trackResponse.body.track_list[0].track;
      const lyrics = await getLyricsForTrack(track.track_id, track.commontrack_id);
      setLyrics(lyrics.body);
    };

    fetchSongLyrics();
  }, [song]);

  return lyrics;
}