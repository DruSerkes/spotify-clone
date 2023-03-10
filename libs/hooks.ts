import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
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