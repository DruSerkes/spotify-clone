import type { NextPage } from 'next'
// import { useSession } from 'next-auth/react';
import Head from 'next/head'
// import Image from 'next/image'
import { Main } from '../components/Main';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  // const { data: session, status } = useSession()
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex min-h-screen'>
        <Sidebar />
        <Main />
      </main>

      <footer>
        {/* Player */}
      </footer>
    </div>
  )
}

export default Home
