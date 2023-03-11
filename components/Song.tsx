import { msToDuration } from "../libs/helpers";

interface Props {
  song: SpotifyApi.PlaylistTrackObject;
  order: number;
}

export function Song({ song, order }: Props) {
  return (
    <div className="grid grid-cols-2 p-3">
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img src={song.track?.album.images?.[0].url} className="h-10 w-10 inline-block" />
        <div className="">
          <p className="w-36 lg:w-44 truncate">{song.track?.name}</p>
          <p className="w-36 lg:w-44 truncate">{song.track?.artists.map((artist, i) => i > 0 ? `, ${artist.name}` : artist.name).join('')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-36 lg:w-44 truncate">
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