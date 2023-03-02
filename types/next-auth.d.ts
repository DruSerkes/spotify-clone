import NextAuth from "next-auth"
import { JwtToken } from "./types"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends JwtToken { }
}