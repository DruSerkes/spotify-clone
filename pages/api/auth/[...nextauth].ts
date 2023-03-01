import NextAuth, { AuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL, spotifyApi } from "../../../libs/spotify"
import { JwtToken } from "../../../types/types";

const refreshAccessToken = async (token: JwtToken): Promise<JwtToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedAccessToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      refreshToken: refreshedAccessToken.refresh_token ?? token.refreshToken,
      username: token.username,
      expirationMs: Date.now() + refreshedAccessToken.expires_in * 1000, // ONE HOUR FROM NOW
    }
  } catch (e) {
    console.log(e);
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          expirationMs: (account.expires_at ?? 1) * 1000
        }
      }

      // Token has not yet expired
      if (Date.now() < (token.expirationMs as number)) return token;

      // Refresh the expired token
      console.log("Access Expired - Refreshing");
      return await refreshAccessToken(token as JwtToken)
    },
    async session({ session, token }) {
      return {
        ...session,
        username: token.username,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    }
  }
};

export default NextAuth(authOptions)