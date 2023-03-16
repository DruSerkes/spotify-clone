import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react";

interface Props {
  playlist?: SpotifyApi.SinglePlaylistResponse;
}

const HEADER_COLORS = [
  "from-red-600",
  "from-orange-600",
  "from-yellow-600",
  "from-green-600",
  "from-blue-600",
  "from-indigo-600",
  "from-violet-600"
];

export function MainHeaderSection({ playlist }: Props) {
  const { data: session } = useSession();
  const [headerBgColor, setHeaderBgColor] = useState('');
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

  return (
    <section className={`flex items-center space-x-7 bg-gradient-to-b to-black h-1/2 p-8 ${headerBgColor}`}>
      {!!playlist && (
        <>
          <img src={playlist?.images?.[0]?.url} alt="Header Background" className="h-3/5 w-auto shadow-slate-800 shadow-2xl" />
          <div className="space-y-4 flex flex-col justify-end h-3/5">
            <h5>Playlist</h5>
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold">{playlist?.name}</h2>

            <p className="hidden sm:flex items-center">
              {session?.user?.image && <img src={session.user.image} alt="user" className="rounded-full w-7 h-7 inline mr-2" />}
              <span>
                {playlist.owner.display_name} &#x2022; {playlist.tracks.items.length} songs, {!!hours && `${hours} hours`} {!!minutes && `${minutes} min`} {!!seconds && `${seconds} sec`}
              </span>
            </p>
          </div>
        </>
      )}
    </section>
  )
}
