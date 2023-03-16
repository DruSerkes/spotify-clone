import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { currentSongIdState, isSongPlayingState } from "../atoms/songAtom";
import { handleError, msToDuration } from "../libs/helpers";
import { useSpotify } from "../libs/hooks";
import { PREMIUM_REQUIRED } from "../vars/errors";

interface Props {
  song: SpotifyApi.PlaylistTrackObject;
  order: number;
  showAddedDate: boolean;
}

export function Song({ song, order, showAddedDate }: Props) {
  const spotify = useSpotify();
  const [isHovering, setIsHovering] = useState(false);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingState);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);

  const handleClickPause = () => {
    spotify.pause();
    setIsPlaying(false);
  };

  const handleClickPlay = useCallback(async () => {
    if (!song.track) return;

    try {
      await spotify.play({ uris: [song.track.uri] });
      setCurrentSongId(song.track?.id ?? '');
    } catch (e: any) {
      handleError(e, setErrorMessage);
    }
  }, [song]);

  if (song.track?.id === currentSongId) console.log({ song })

  return (
    <div
      className="grid grid-cols-2 px-3 py-2 my-1 hover:bg-white hover:bg-opacity-20 rounded text-gray-400"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center space-x-4">
        <p>
          {(currentSongId === song.track?.id && isPlaying)
            ? <PauseIcon className="h-4 w-4" fill="white" onClick={handleClickPause} />
            : isHovering || (currentSongId === song.track?.id && !isPlaying)
              ? <PlayIcon className="h-4 w-4" fill="white" onClick={handleClickPlay} />
              : order}
        </p>
        <img src={song.track?.album.images?.[0].url} className={`h-10 w-10 inline-block`} />

        <div>
          <p className="w-36 lg:w-44 truncate cursor-pointer hover:underline text-white">{song.track?.name}</p>
          <p className={`w-36 lg:w-44 text-sm truncate ${isHovering ? 'text-white' : ''}`}>
            {song.track?.artists.map((artist, i) => <span key={artist.id}>{i > 0 ? ', ' : ''}<span id={artist.id} className="cursor-pointer hover:underline">{artist.name}</span></span>)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className={`hidden md:inline w-36 lg:w-44 cursor-pointer hover:underline truncate ${isHovering ? 'text-white' : ''}`}>
          {song.track?.album.name}
        </p>


        {showAddedDate && (
          <p className="hidden md:inline w-36 lg:w-44 truncate">
            {new Date(song.added_at).toDateString()}
          </p>
        )}

        <p className="">
          {song.track?.duration_ms ? msToDuration(song.track.duration_ms) : ''}
        </p>
      </div>
    </div>
  )
}

export default Song