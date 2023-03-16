import { ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentSongIdState, currentSongState, lastSongState, isSongPlayingState } from '../atoms/songAtom';
import { useSong, useSpotify } from '../libs/hooks'
import { CurrentlyPlaying } from './CurrentlyPlaying';
import { SongControls } from './SongControls';
import { SoundControls } from './SoundControls';

export function NowPlayingBar() {
  const spotify = useSpotify();
  const { data: session } = useSession();
  // const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  // const [lastSong, setLastSong] = useRecoilState(lastSongState);
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingState);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [volume, setVolume] = useState(50);
  const song = useSong();
  console.log({ isPlaying })
  useEffect(() => {
    const getCurrentSong = async () => {
      if (!spotify.getAccessToken()) return;

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
        console.log(e);
      }
    };

    if (!currentSongId || !song) getCurrentSong();
  }, [spotify, session, currentSongId]);

  return (
    <div className='w-full h-full items-center px-5 grid grid-cols-3 text-white text-sm'>
      {/* <CurrentlyPlaying song={currentSong ? currentSong : lastSong as SpotifyApi.TrackObjectFull} /> */}
      {song && <CurrentlyPlaying song={song} />}

      <SongControls isPlaying={isPlaying} />

      <SoundControls />
    </div>
  )
}
