import React, { useEffect, } from 'react'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentSongIdState, isSongPlayingState } from '../atoms/songAtom';
import { useSong, useSpotify } from '../libs/hooks'
import { CurrentlyPlaying } from './CurrentlyPlaying';
import { SongControls } from './SongControls';
import { SoundControls } from './SoundControls';
import { handleError } from '../libs/helpers';
import { apiErrorMessage } from '../atoms/errorAtom';

export function NowPlayingBar() {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingState);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);
  const song = useSong();

  useEffect(() => {
    const getCurrentSong = async () => {
      if (!spotify.getAccessToken()) return;
      console.log("Running");
      try {
        const currentPlaybackState = await spotify.getMyCurrentPlaybackState();
        setIsPlaying(currentPlaybackState.body?.is_playing);

        const track = await spotify.getMyCurrentPlayingTrack();
        // If not currently listening, use most recently played song
        if (!track.body) {
          const track = await spotify.getMyRecentlyPlayedTracks();
          return setCurrentSongId(track.body.items[0].track.id);
        };

        setCurrentSongId(track.body.item?.id ?? '');
      } catch (e) {
        handleError(e, setErrorMessage);
      }
    };

    getCurrentSong();
  }, [spotify, session, currentSongId]);

  return (
    <div className='w-full h-full items-center px-5 grid grid-cols-3 text-white text-sm'>
      {song && <CurrentlyPlaying song={song} />}
      <SongControls />
      <SoundControls />
    </div>
  )
}
