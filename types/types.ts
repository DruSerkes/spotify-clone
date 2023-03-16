import { JWT } from 'next-auth/jwt';

export type JwtToken = JWT & {
  accessToken: string;
  refreshToken: string;
  username: string;
  expirationMs: number
}

export type RepeatState = 'off' | 'context' | 'track';