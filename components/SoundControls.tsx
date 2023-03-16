import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { apiErrorMessage } from "../atoms/errorAtom";
import { handleError } from "../libs/helpers";
import { useSpotify } from "../libs/hooks";
import { PREMIUM_REQUIRED } from "../vars/errors";

interface Props { }

export function SoundControls() {
  const spotify = useSpotify();
  const [volume, setVolume] = useState(50);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);
  const handleChangeVolume: React.ChangeEventHandler<HTMLInputElement> = (e) => setVolume(Number(e.target.value));

  useEffect(() => {
    if (volume < 0 || volume > 100) return;
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

  return (
    <div className='flex justify-end'>
      <div className="w-[40%] flex items-center space-x-1 md:space-x-3">
        <SpeakerWaveIcon className="control-btn w-6 h-6" />
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
    </div>
  )
}