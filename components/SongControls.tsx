import { ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PauseIcon, PlayCircleIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { useSpotify } from "../libs/hooks";
import { apiErrorMessage } from "../atoms/errorAtom";
import { RepeatState } from "../types/types";
import { isSongPlayingState } from "../atoms/songAtom";
import { handleError } from "../libs/helpers";

interface Props { }

export function SongControls() {
  const spotify = useSpotify();
  const [repeatState, setRepeatState] = useState<RepeatState>('off');
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingState);
  const [isShuffling, setIsShuffling] = useState(false);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);

  const handleGoToPrevious = async () => {
    try {
      await spotify.skipToPrevious()
    } catch (e: any) {
      handleError(e, setErrorMessage);
    }
  };

  const handleGoToNext = async () => {
    try {
      await spotify.skipToNext()
    } catch (e: any) {
      handleError(e, setErrorMessage);
    }
  };

  const handleClickPausePlay = async () => {
    try {
      const data = await spotify.getMyCurrentPlaybackState()
      if (data.body.is_playing) {
        await spotify.pause();
        return setIsPlaying(false);
      };

      await spotify.play();
      return setIsPlaying(true);
    } catch (e: any) {
      handleError(e, setErrorMessage);
    }
  };

  const handleClickShuffle = async () => {
    try {
      await spotify.setShuffle(!isShuffling);
      setIsShuffling(!isShuffling);
    } catch (e: any) {
      handleError(e, setErrorMessage);
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
      handleError(e, setErrorMessage);
    }
  }, [repeatState]);

  return (
    <div className='flex flex-col justify-center space-y-3'>
      <div className='flex items-center justify-center space-x-3'>
        <ArrowsRightLeftIcon className={`control-btn text-gray-400 hover:text-gray-300 ${isShuffling ? 'text-gray-300' : ''}`} onClick={handleClickShuffle} />
        <BackwardIcon className='control-btn text-black fill-gray-400 hover:fill-gray-300' onClick={handleGoToPrevious} />
        {isPlaying ? <PauseIcon className='control-btn-lg' onClick={handleClickPausePlay} /> : <PlayIcon className='control-btn-lg' onClick={handleClickPausePlay} />}
        <ForwardIcon className='control-btn text-black fill-gray-400 hover:fill-gray-300' onClick={handleGoToNext} />
        <ArrowPathRoundedSquareIcon
          className={`control-btn text-gray-400 hover:text-gray-300 ${(repeatState === 'context' || repeatState === 'track') ? 'text-gray-300' : ''} ${repeatState === 'track' ? 'track-repeat' : ''}`}
          onClick={handleClickRepeat}
        />
      </div>

      {/* TODO: Playback time Bar */}
      <div className='flex justify-center items-center w-full h-1 bg-gray-300 rounded-md'>

      </div>
    </div>
  )
}