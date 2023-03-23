import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getLyricsForTrack, searchForTrack } from '../../libs/musixmatch';
import { Lyrics } from '../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ lyrics: Lyrics }>) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // Rest of the API logic

  const { track, artist } = req.query;
  const trackResponse = await searchForTrack(track as string, artist as string);
  const lyrics = (await getLyricsForTrack(trackResponse?.message?.body.track_list?.[0]?.track?.track_id, trackResponse.message.body.track_list[0].track.commontrack_id)).message.body.lyrics

  res.json({ lyrics });
}