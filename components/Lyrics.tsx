import { useSongLyrics } from "../libs/hooks"

export function Lyrics() {
  const lyrics = useSongLyrics()
  return (
    <div className="w-full flex flex-col justify-start items-center
        bg-[#407CA1] text-4xl font-semibold pt-6 pb-24">
      {lyrics?.lyrics_body
        ? (
          <>
            {lyrics.lyrics_body.split('\n').map((lyric, i) => (
              <p
                key={!!lyric ? lyric : i}
                className="text-gray-900 hover:text-white hover:cursor-pointer px-24 text-left w-full my-3">
                {lyric.trim()}
              </p>
            ))}
            <p className="px-24 text-left w-full my-3 text-base text-black font-light">{lyrics.lyrics_copyright}</p>
          </>
        )
        : <h3 className="text-white">Lyrics Not Found</h3>}
    </div>
  )
}
