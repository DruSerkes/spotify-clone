import { useSession } from "next-auth/react"
import { useEffect, } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { handleError } from "../libs/helpers";
import { useSpotify } from "../libs/hooks";
import { ErrorModal } from "./ErrorModal";
import { HeaderDropdown } from "./HeaderDropdown";
import { MainHeaderSection } from "./MainHeaderSection";
import { Songs } from "./Songs";

export const Main = () => {
  const { data: session } = useSession();
  const [playlistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<SpotifyApi.SinglePlaylistResponse | undefined>(playlistState);
  const spotify = useSpotify();
  const [error, setError] = useRecoilState(apiErrorMessage);
  const clearError = () => setError("");

  useEffect(() => {
    const getPlaylist = async () => {
      if (!spotify.getAccessToken() || !playlistId) return;

      try {
        const res = await spotify.getPlaylist(playlistId);
        setPlaylist(res.body);
      } catch (e) {
        handleError(e, setError);
      }
    }

    if (!playlist || playlistId !== playlist.id) getPlaylist();
  }, [playlist, session, playlistId]);

  return (
    <div className="flex-grow h-screen w-[82.5%] overflow-y-scroll scrollbar-hide text-white">
      <HeaderDropdown />
      <MainHeaderSection playlist={playlist} />
      {playlist && <Songs playlist={playlist} />}
      {!!error && <ErrorModal error={error} closeModal={clearError} />}
    </div>
  )
}