import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID_PROD as string,
      clientSecret: process.env.GITHUB_SECRET_PROD as string,
      
    }),
    
  ],
  secret: process.env.secret
}

export default NextAuth(authOptions)