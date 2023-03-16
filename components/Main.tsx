import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { handleError } from "../libs/helpers";
import { useSpotify } from "../libs/hooks";
import { ErrorModal } from "./ErrorModal";
import { HeaderDropdown } from "./HeaderDropdown";
import { Songs } from "./Songs";

const HEADER_COLORS = [
  "from-red-600",
  "from-orange-600",
  "from-yellow-600",
  "from-green-600",
  "from-blue-600",
  "from-indigo-600",
  "from-violet-600"
];

export const Main = () => {
  const { data: session } = useSession();
  const [headerBgColor, setHeaderBgColor] = useState<string>();
  const [playlistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<SpotifyApi.SinglePlaylistResponse | undefined>(playlistState);
  const spotify = useSpotify();
  const [error, setError] = useRecoilState(apiErrorMessage);
  const clearError = () => setError("");
  const playlistLengthMs = useMemo(() => playlist?.tracks.items.reduce((acc, cur) => acc + (cur.track?.duration_ms ?? 0), 0), [playlist]);
  const { seconds, minutes, hours } = useMemo(() => {
    const seconds = Math.floor((playlistLengthMs ?? 0) / 1000) % 60;
    const minutes = Math.floor(((playlistLengthMs ?? 0) / 1000 / 60) % 60);
    const hours = Math.floor(((playlistLengthMs ?? 0) / 1000 / 60 / 60) % 24);
    return { seconds, minutes, hours }
  }, [playlistLengthMs]);

  useEffect(() => {
    const randomBgColor = HEADER_COLORS[Math.floor(Math.random() * HEADER_COLORS.length)]
    setHeaderBgColor(randomBgColor);
  }, []);

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

      {/* Artwork and Info */}
      <section className={`flex items-center space-x-7 bg-gradient-to-b to-black h-1/2 p-8 ${headerBgColor}`}>
        {!!playlist && (
          <>
            <img src={playlist?.images?.[0]?.url} alt="Header Background" className="h-3/5 w-auto shadow-slate-800 shadow-2xl" />
            <div className="space-y-4 flex flex-col justify-end h-3/5">
              <h5>Playlist</h5>
              <h2 className="text-3xl med:text-5xl lg:text-7xl font-bold">{playlist?.name}</h2>

              <p className="flex align-middle">
                {session?.user?.image && <img src={session.user.image} alt="user" className="rounded-full w-7 h-7 inline mr-2" />}
                {playlist.owner.display_name} &#x2022; {playlist.tracks.items.length} songs, {!!hours && `${hours} hours`} {!!minutes && `${minutes} min`} {!!seconds && `${seconds} sec`}
              </p>
            </div>
          </>
        )}
      </section>

      <section className="p-8 min-h-[50%]">
        {playlist && <Songs playlist={playlist} />}
      </section>

      {!!error && <ErrorModal error={error} closeModal={clearError} />}
    </div>
  )
}