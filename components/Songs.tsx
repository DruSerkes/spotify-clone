import { ClockIcon } from "@heroicons/react/24/outline"
import Song from "./Song";

interface Props {
  playlist: SpotifyApi.SinglePlaylistResponse;
};

export function Songs({ playlist }: Props) {
  return (
    <section className="p-8 min-h-[50%]">
      <div className="w-full">
        <div className="grid grid-cols-2 text-slate-200 opacity-70 border-b-[1px] p-3">
          <div className="flex items-center space-x-4">
            <p>#</p>
            <p>Title</p>
          </div>
          <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="hidden md:inline">Album</p>
            {playlist.tracks.items.some(song => !!song.added_at) && <p className="hidden md:inline">Date Added</p>}
            <p><ClockIcon className="h-5 w-5" /></p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly">
          {playlist.tracks.items.map((song, i) => song.track ? <Song song={song} order={i + 1} key={song.track.id} /> : null)}
        </div>
      </div>
    </section>
  )
}