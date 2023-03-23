import { MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { handleError } from "../libs/helpers";
import { useSongLyrics, useSpotify } from "../libs/hooks";

interface Props { }

export function SoundControls() {
  const spotify = useSpotify();
  const [volume, setVolume] = useState(50);
  const [showLyrics, setShowLyrics] = useState(false);
  const lyrics = useSongLyrics();
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);
  const handleChangeVolume: React.ChangeEventHandler<HTMLInputElement> = (e) => setVolume(Number(e.target.value));
  const handleShowLyrics = () => setShowLyrics(!showLyrics);

  useEffect(() => {
    if (volume < 0 || volume > 100 || volume === 50) return;
    const timeoutID = setTimeout(async () => {
      console.log("Setting Volume to: ", volume);
      try {
        await spotify.setVolume(volume);
      } catch (e: any) {
        handleError(e, setErrorMessage);
      }
    }, 300);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [volume]);

  // TODO: ADD LYRICS
  return (
    <div className='flex justify-end'>
      <div className="w-[40%] flex items-center space-x-1 md:space-x-3">
        <MicrophoneIcon className={`control-btn text-gray-400 hover:text-white ${showLyrics ? 'text-green-600 hover:text-green-400' : ''}`} onClick={handleShowLyrics} />
        <SpeakerWaveIcon className="control-btn" />
        <input
          min={0}
          max={100}
          type='range'
          name='volume'
          className="w-full"
          value={volume}
          onChange={handleChangeVolume}
        />
      </div>
      {showLyrics && (
        <div className="fixed top-0 right-0 w-[84.25%] h-[89%] flex justify-center items-center bg-[#407CA1] text-white">
          {lyrics?.lyrics_body
            ? <p>{lyrics.lyrics_body}</p>
            : <h3 className="text-4xl">Lyrics Not Found</h3>}
        </div>
      )}
    </div>
  )
}