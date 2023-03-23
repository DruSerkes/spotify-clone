import type { NextPage } from 'next'
import Head from 'next/head'
import { Main } from '../components/Main';
import { NowPlayingBar } from '../components/NowPlayingBar';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
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

      <footer className="fixed bottom-0 w-full h-24 hidden md:block bg-[rgb(24,24,24)] border-t-[1px] border-[#282828]">
        <NowPlayingBar />
      </footer>
    </div>
  )
}

export default Home
