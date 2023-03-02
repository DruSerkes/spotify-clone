import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  console.log({ session })
  console.log({ status })
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <Sidebar />
        {/* Center */}
      </main>

      <footer>
        {/* Player */}
      </footer>
    </div>
  )
}

export default Home
