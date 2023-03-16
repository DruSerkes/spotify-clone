import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react';

export function HeaderDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const handleLogout = () => signOut({ callbackUrl: '/login' });

  return (
    <header className="flex justify-end sm:absolute top-4 right-5">
      <div className="bg-black flex space-x-3 items-center opacity-80 cursor-pointer rounded-full p-[0.1rem] pr-2">
        <img src={session?.user?.image ?? undefined} alt="user" className="rounded-full w-9 h-9" />
        <h2 className="font-bold text-sm">{session?.user?.name}</h2>
        {isOpen
          ? <ChevronUpIcon className="h-4 w-4" fill="white" onClick={toggleIsOpen} />
          : <ChevronDownIcon className="h-4 w-4" fill="white" onClick={toggleIsOpen} />}
      </div>
      {isOpen && (
        <div className='absolute top-11 right-1 rounded w-52 h-auto bg-gray-800 bg-opacity-90 p-1'>
          <p className='rounded p-3 hover:cursor-pointer hover:bg-white hover:bg-opacity-25' onClick={handleLogout}>Log out</p>
        </div>
      )}
    </header>
  )
};