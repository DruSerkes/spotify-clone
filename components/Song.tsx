import { PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { msToDuration } from "../libs/helpers";

interface Props {
  song: SpotifyApi.PlaylistTrackObject;
  order: number;
}

export function Song({ song, order }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="grid grid-cols-2 px-3 py-2 my-1 hover:bg-white hover:bg-opacity-20 hover:rounded text-gray-400"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center space-x-4">
        <p>{isHovering ? <PlayIcon className="h-4 w-4" fill="white" /> : order}</p>
        <img src={song.track?.album.images?.[0].url} className={`h-10 w-10 inline-block`} />

        <div>
          <p className="w-36 lg:w-44 truncate text-white">{song.track?.name}</p>
          <p className={`w-36 lg:w-44 truncate ${isHovering ? 'text-white' : ''}`}>
            {song.track?.artists.map((artist, i) => i > 0 ? `, ${artist.name}` : artist.name).join('')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className={`hidden md:inline w-36 lg:w-44 truncate ${isHovering ? 'text-white' : ''}`}>
          {song.track?.album.name}
        </p>

        <p className="hidden md:inline w-36 lg:w-44 truncate">
          {new Date(song.added_at).toDateString()}
        </p>

        <p className="">
          {song.track?.duration_ms ? msToDuration(song.track.duration_ms) : ''}
        </p>
      </div>
    </div>
  )
}

export default Song