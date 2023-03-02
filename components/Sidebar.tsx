import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, HeartIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useSpotify } from '../libs/hooks'
import { SidebarButton } from './SidebarButton'

function Sidebar() {
  const { data: session } = useSession();
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
      } catch (error) {
        console.log(error);
      }
    }

    if (!playlists.length && !hasFetchedPlaylists.current) getPlaylists()
  }, [playlists, session])

  return (
    <div className='border-r-black w-[17.5%] h-screen bg-black text-gray-400 p-5'>
      <Image
        src="/Spotify_Logo_RGB_Green.png"
        alt='Spotify'
        height={42}
        width={140}
        className='mt-2 mb-5 ml-2'
        priority
      />
      <div className='w-full space-y-5'>
        <button className='flex space-x-3' onClick={() => signOut({ callbackUrl: '/login' })}>
          <ArrowDownOnSquareIcon className='h-5 w-5' />
          <span>Logout</span>
        </button>
        <SidebarButton Icon={HomeIcon} text="Home" />
        <SidebarButton Icon={MagnifyingGlassIcon} text="Search" />
        <SidebarButton Icon={BuildingLibraryIcon} text="Your Library" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        <SidebarButton Icon={PlusCircleIcon} text="Create Playlist" />
        <SidebarButton Icon={HeartIcon} text="Liked Songs" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        <section className='h-96 space-y-5 overflow-y-scroll scrollbar-hide'>
          {/* TODO: Add Playlist click logic */}
          {playlists && playlists.map(playlist => (
            <p className='cursor-pointer hover:text-white text-sm' key={playlist.id}>
              {playlist.name}
            </p>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Sidebar