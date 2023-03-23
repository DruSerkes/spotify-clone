import { signIn, useSession } from "next-auth/react"
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { lyricsState } from "../atoms/lyricsAtom";
import { currentSongIdState } from "../atoms/songAtom";
import { REFRESH_ACCESS_TOKEN_ERROR } from "../vars/errors";
import { handleError } from "./helpers";
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
  const [_, setError] = useRecoilState(apiErrorMessage);

  useEffect(() => {
    const fetchSongLyrics = async () => {
      if (!song) return;

      try {
        const res = await fetch(`/api/lyrics?track=${song.name}&artist=${song.artists[0].name}`);
        const { lyrics } = await res.json();
        setLyrics(lyrics);
      } catch (e: any) {
        handleError(e, setError);
      }
    };

    fetchSongLyrics();
  }, [song]);

  return lyrics;
}