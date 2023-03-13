import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { currentSongIdState, currentSongState } from '../atoms/songAtom';
import { useSpotify } from '../libs/hooks'

export function NowPlayingBar() {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);

  useEffect(() => {
    const getCurrentSong = async () => {
      if (!spotify.getAccessToken()) return;

      try {
        const res = await spotify.getMyCurrentPlayingTrack();
        console.log({ res });
        setCurrentSong(res.body);
        setCurrentSongId(res.body.item?.id ?? '');
      } catch (e) {
        console.log(e);
      }
    };

    if (!currentSong) getCurrentSong();
  }, [currentSong, spotify, session]);

  return (
    <div className='w-full h-full items-center px-5 grid grid-cols-3 text-white text-sm'>
      <div className='flex items-center space-x-3'>
        {!!currentSong?.item && (
          <>
            <img src={'album' in currentSong.item ? currentSong.item.album.images?.[0].url : undefined} className={`h-16 w-16 inline-block`} />

            <div className='space-y-1'>
              <p className="w-36 lg:w-44 truncate cursor-pointer hover:underline">{currentSong.item?.name}</p>
              <p className={`w-36 lg:w-44 text-xs text-gray-400 truncate hover:text-white`}>
                {'artists' in currentSong?.item && currentSong.item?.artists.map((artist, i) => <span key={artist.id}>{i > 0 ? ', ' : ''}<span id={artist.id} className="cursor-pointer hover:underline">{artist.name}</span></span>)}
              </p>
            </div>
          </>
        )}
      </div>

      <div className='flex justify-center'>
        Controls
      </div>

      <div className='flex justify-end'>
        Icons/Volume
      </div>
    </div>
  )
}
