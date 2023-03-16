interface Props {
  song: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull;
}

export function CurrentlyPlaying({ song }: Props) {
  if (!song) return <div />;

  return (
    <div className='flex items-center space-x-3'>
      <img src={'album' in song ? song.album.images?.[0].url : undefined} className={`h-16 w-16 inline-block`} />

      <div className='space-y-1'>
        <p className="w-36 lg:w-44 truncate cursor-pointer hover:underline">{song?.name}</p>
        <p className={`w-36 lg:w-44 text-xs text-gray-400 truncate hover:text-white`}>
          {'artists' in song && song?.artists.map((artist, i) => <span key={artist.id}>{i > 0 ? ', ' : ''}<span id={artist.id} className="cursor-pointer hover:underline">{artist.name}</span></span>)}
        </p>
      </div>
    </div>
  )
};