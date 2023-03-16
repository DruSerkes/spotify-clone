import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, HeartIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { apiErrorMessage } from '../atoms/errorAtom'
import { playlistIdState } from '../atoms/playlistAtom'
import { handleError } from '../libs/helpers'
import { useSpotify } from '../libs/hooks'
import { SidebarButton } from './SidebarButton'

function Sidebar() {
  const { data: session } = useSession();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [_, setErrorMessage] = useRecoilState(apiErrorMessage);
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
  const hasFetchedPlaylists = useRef(false);
  const spotify = useSpotify();

  useEffect(() => {
    const getPlaylists = async () => {
      if (!spotify.getAccessToken()) return;

      try {
        const res = await spotify.getUserPlaylists({ limit: 30 });
        setPlaylists(res.body.items);
        hasFetchedPlaylists.current = true;
      } catch (e) {
        handleError(e, setErrorMessage);
      }
    }

    if (!playlists.length && !hasFetchedPlaylists.current) getPlaylists()
  }, [playlists, session])

  return (
    <div className='border-r-black w-[17.5%] h-screen bg-black text-gray-400 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block'>
      <Image
        src="/Spotify_Logo_RGB_Green.png"
        alt='Spotify'
        height={42}
        width={140}
        className='mt-2 mb-5 ml-2'
        priority
      />
      <div className='w-full space-y-5'>
        <SidebarButton Icon={HomeIcon} text="Home" />
        <SidebarButton Icon={MagnifyingGlassIcon} text="Search" />
        <SidebarButton Icon={BuildingLibraryIcon} text="Your Library" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        <SidebarButton Icon={PlusCircleIcon} text="Create Playlist" />
        <SidebarButton Icon={HeartIcon} text="Liked Songs" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        <section className='h-[400px] space-y-5 overflow-y-scroll scrollbar-hide'>
          {playlists && playlists.map(playlist => (
            <p className={`cursor-pointer hover:text-white ${playlistId === playlist.id ? 'text-white' : ''}`} key={playlist.id} onClick={() => setPlaylistId(playlist.id)}>
              {playlist.name}
            </p>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Sidebar