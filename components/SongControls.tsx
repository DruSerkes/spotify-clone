import { ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PauseIcon, PlayCircleIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSpotify } from "../libs/hooks";
import { apiErrorMessage } from "../atoms/errorAtom";
import { PREMIUM_REQUIRED } from "../vars/errors";
import { RepeatState } from "../types/types";

interface Props {
  isPlaying: boolean;
}

export function SongControls({ isPlaying }: Props) {
  const spotify = useSpotify();
  const [repeatState, setRepeatState] = useState<RepeatState>('off');
  const [isShuffling, setIsShuffling] = useState(false);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);

  const handleGoToPrevious = async () => {
    try {
      await spotify.skipToPrevious()
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  };

  const handleGoToNext = async () => {
    try {
      await spotify.skipToNext()
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  };

  const handleClickPause = async () => {
    try {
      await spotify.pause()
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  };

  const handleClickPlay = async () => {
    try {
      await spotify.play()
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  };

  const handleClickShuffle = async () => {
    try {
      await spotify.setShuffle(!isShuffling);
      setIsShuffling(!isShuffling);
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  };

  const handleClickRepeat = useCallback(async () => {
    try {
      switch (repeatState) {
        case 'off':
          await spotify.setRepeat('context');
          return setRepeatState('context')
        case 'context':
          await spotify.setRepeat('track');
          return setRepeatState('track');
        case 'track':
          await spotify.setRepeat('off');
          return setRepeatState('off');
        default:
          break;
      }
    } catch (e: any) {
      console.log(e);
      if (e?.body?.error?.reason === PREMIUM_REQUIRED) return setErrorMessage('Spotify Premium is required to perform that command')
      setErrorMessage('Something went wrong. Please refresh and try again');
    }
  }, [repeatState]);

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center justify-center space-x-3'>
        <ArrowsRightLeftIcon className={`control-btn text-gray-400 hover:text-gray-300 ${isShuffling ? 'text-gray-300' : ''}`} onClick={handleClickShuffle} />
        <BackwardIcon className='control-btn text-black fill-gray-400 hover:fill-gray-300' onClick={handleGoToPrevious} />
        {isPlaying ? <PauseIcon className='control-btn-lg' onClick={handleClickPause} /> : <PlayIcon className='control-btn-lg' onClick={handleClickPlay} />}
        <ForwardIcon className='control-btn text-black fill-gray-400 hover:fill-gray-300' onClick={handleGoToNext} />
        <ArrowPathRoundedSquareIcon
          className={`control-btn text-gray-400 hover:text-gray-300 ${(repeatState === 'context' || repeatState === 'track') ? 'text-gray-300' : ''} ${repeatState === 'track' ? 'track-repeat' : ''}`}
          onClick={handleClickRepeat}
        />
      </div>

      <div className='flex justify-center items-center'>

      </div>
    </div>
  )
}