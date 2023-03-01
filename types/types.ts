import { JWT } from 'next-auth/jwt';

export type JwtToken = JWT & {
  accessToken: string;
  refreshToken: string;
  username: string;
  expirationMs: number
}