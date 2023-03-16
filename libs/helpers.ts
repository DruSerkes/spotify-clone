import { PREMIUM_REQUIRED } from "../vars/errors";

export const msToDuration = (timeMs: number) => `${Math.floor(timeMs / 60000)}:${Math.round((timeMs / 1000) % 60).toString().padStart(2, '0')}`

export const handleError = (e: any, cb: (message: string) => void) => {
  console.log(e);
  if (e?.body?.error?.reason === PREMIUM_REQUIRED) return cb('Spotify Premium is required to perform that command')
  cb('Something went wrong. Please refresh and try again');
}