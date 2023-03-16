import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentSongIdState, currentSongState, lastSongState, isSongPlayingState } from '../atoms/songAtom';
import { useSong, useSpotify } from '../libs/hooks'
import { CurrentlyPlaying } from './CurrentlyPlaying';

export function NowPlayingBar() {
  const spotify = useSpotify();
  const { data: session } = useSession();
  // const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  // const [lastSong, setLastSong] = useRecoilState(lastSongState);
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingState);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [volume, setVolume] = useState(50);
  const song = useSong();

  useEffect(() => {
    const getCurrentSong = async () => {
      if (!spotify.getAccessToken()) return;

      try {
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

    if (!song) getCurrentSong();
  }, [spotify, session, currentSongId]);

  return (
    <div className='w-full h-full items-center px-5 grid grid-cols-3 text-white text-sm'>
      {/* <CurrentlyPlaying song={currentSong ? currentSong : lastSong as SpotifyApi.TrackObjectFull} /> */}
      {song && <CurrentlyPlaying song={song} />}

      <div className='flex justify-center'>
        Controls
      </div>

      <div className='flex justify-end'>
        Icons/Volume
      </div>
    </div>
  )
}
