import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, PlusCircleIcon, HeartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { SidebarButton } from './SidebarButton'

function Sidebar() {
  return (
    <div className='border-r-black w-[17.5%] h-screen bg-black text-gray-400 p-5'>
      <Image
        src="/Spotify_Logo_RGB_Green.png"
        alt='Spotify'
        height={50}
        width={141}
        className='mt-2 mb-5 ml-2'
      />
      <div className='w-full p-3 space-y-5'>
        <SidebarButton Icon={HomeIcon} text="Home" />
        <SidebarButton Icon={MagnifyingGlassIcon} text="Search" />
        <SidebarButton Icon={BuildingLibraryIcon} text="Your Library" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        <SidebarButton Icon={PlusCircleIcon} text="Create Playlist" />
        <SidebarButton Icon={HeartIcon} text="Liked Songs" />

        <hr className='border-t-[0.1px] w-7/8 mx-auto border-gray-700' />

        {/* TODO: Add Playlists */}
      </div>
    </div>
  )
}

export default Sidebar