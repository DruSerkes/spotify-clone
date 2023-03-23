import { JWT } from 'next-auth/jwt';

export type JwtToken = JWT & {
  accessToken: string;
  refreshToken: string;
  username: string;
  expirationMs: number
}

export type RepeatState = 'off' | 'context' | 'track';

export interface TrackState {
  "track": {
    "track_id": number;
    "track_name": string;
    "track_name_translation_list": string[];
    "track_rating": number;
    "commontrack_id": number;
    "instrumental": 0 | 1;
    "explicit": 0 | 1;
    "has_lyrics": 0 | 1;
    "has_subtitles": 0 | 1;
    "has_richsync": 0 | 1;
    "num_favourite": number;
    "album_id": number;
    "album_name": string;
    "artist_id": number;
    "artist_name": string;
    "track_share_url": string;
    "track_edit_url": string;
    "restricted": 0 | 1,
    "updated_time": string;
    "primary_genres": {
      "music_genre_list":
      {
        "music_genre": {
          "music_genre_id": number;
          "music_genre_parent_id": number;
          "music_genre_name": string;
          "music_genre_name_extended": string;
          "music_genre_vanity": string;
        }
      }[]
    }
  }
};

export interface Lyrics {
  "lyrics_id": number;
  "explicit": 0 | 1;
  "lyrics_body": string;
  "script_tracking_url": string;
  "pixel_tracking_url": string;
  "lyrics_copyright": string;
  "updated_time": string;
}