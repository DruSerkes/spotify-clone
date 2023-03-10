import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useSpotify } from "../libs/hooks";


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
  const playlistLengthMs = useMemo(() => playlist?.tracks.items.reduce((acc, cur) => acc + (cur.track?.duration_ms ?? 0), 0), [playlist]);
  // TODO: clean this up
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
        console.log({ res });
        setPlaylist(res.body);
      } catch (error) {
        console.log(error);
      }
    }

    if (!playlist || playlistId !== playlist.id) getPlaylist();
  }, [playlist, session, playlistId]);

  return (
    <div className="flex-grow h-screen w-[82.5%] overflow-y-scroll scrollbar-hide">
      <header className="absolute top-0 right-0">
        {/* Dropdown */}
        <div className=" text-white bg-black flex space-x-3 items-center opacity-85 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img src={session?.user?.image ?? undefined} alt="user" className="rounded-full w-10 h-10" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-center space-x-7 bg-gradient-to-b to-black h-96 ${headerBgColor}`}>
        {!!playlist && (
          <>
            <img src={playlist?.images?.[0]?.url} alt="Header Background" className="h-2/3 w-auto ml-10 mt-5 shadow-slate-800 shadow-2xl" />
            <div className="text-white space-y-4 flex flex-col justify-end h-2/3 mt-5">
              <h5>Playlist</h5>
              <h2 className="text-2xl med:text-3xl lg:text-6xl xl:text-7xl font-bold">{playlist?.name}</h2>
              <p>{playlist.owner.display_name} &#x2022; {playlist.tracks.items.length}, {!!hours && `${hours} hours`} {!!minutes && `${minutes} min`} {!!seconds && `${seconds} sec`}</p>
            </div>
          </>
        )}
      </section>

    </div>
  )
}