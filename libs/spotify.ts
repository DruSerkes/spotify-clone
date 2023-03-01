import SpotifyWebApi from 'spotify-web-api-node';

const scope = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "user-read-private",
  "streaming",
  "user-library-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played"
].join(",");

const params = {
  scope,
}

const querystring = new URLSearchParams(params).toString();
export const LOGIN_URL = `https://accounts.spotify.com/authorize?${querystring}`;

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
});

