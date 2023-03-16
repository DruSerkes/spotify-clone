import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentSongIdState } from "../atoms/songAtom";
import { REFRESH_ACCESS_TOKEN_ERROR } from "../vars/errors";
import { spotifyApi } from "./spotify";

export const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) return;
    if (session?.error === REFRESH_ACCESS_TOKEN_ERROR) signIn();

    spotifyApi.setAccessToken(session.accessToken);
  }, [session])

  return spotifyApi;
}

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
}