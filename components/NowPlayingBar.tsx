import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { currentSongIdState, currentSongState, lastSongState } from '../atoms/songAtom';
import { useSpotify } from '../libs/hooks'
import { CurrentlyPlaying } from './CurrentlyPlaying';

export function NowPlayingBar() {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [lastSong, setLastSong] = useRecoilState(lastSongState);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);

  useEffect(() => {
    const getCurrentSong = async () => {
      if (!spotify.getAccessToken()) return;

      try {
        const track = await spotify.getMyCurrentPlayingTrack();
        // If not currently listening, use most recently played song
        if (!track.body) {
          const track = await spotify.getMyRecentlyPlayedTracks();
          return setLastSong(track.body.items[0].track)
        };

        setCurrentSong(track.body.item as SpotifyApi.TrackObjectFull);
        setCurrentSongId(track.body.item?.id ?? '');
      } catch (e) {
        console.log(e);
      }
    };

    if (!currentSong && !lastSong) getCurrentSong();
  }, [currentSong, spotify, session]);

  return (
    <div className='w-full h-full items-center px-5 grid grid-cols-3 text-white text-sm'>
      <CurrentlyPlaying song={currentSong ? currentSong : lastSong as SpotifyApi.TrackObjectFull} />

      <div className='flex justify-center'>
        Controls
      </div>

      <div className='flex justify-end'>
        Icons/Volume
      </div>
    </div>
  )
}
