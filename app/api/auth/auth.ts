import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GitHubProvider from "next-auth/providers/github";

function getGithubCredentials() {
  const githubId = process.env.GITHUB_CLIENT_ID;
  const githubSecret = process.env.GITHUB_CLIENT_SRCRET;
  if (!githubId || githubId.length === 0) {
    throw new Error("Github Id Not Found ...");
  }
  if (!githubSecret || githubSecret.length === 0) {
    throw new Error("Github Secret Not Found ...");
  }
  return { githubId, githubSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: getGithubCredentials().githubId,
      clientSecret: getGithubCredentials().githubSecret,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },

    async jwt({token,user}) {
      token.userRole = "admin"
      return token;
    },
  },
};
