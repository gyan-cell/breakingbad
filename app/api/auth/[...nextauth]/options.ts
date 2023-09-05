import connectDb from "@/helpers/connectDb";
import { User } from "@/helpers/model";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(11);

      connectDb();

      console.log(12);
      try {
        const findUser = await User.findOne({ email: user.email });
        console.log(13);
        if (findUser) {
          console.log(14);
          return true;
        }
        await User.create({ email: user.email, name: user.name });
        console.log(15);
        return true;
      } catch (error) {
        console.log("The error is ", error);
        console.log(16);

        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Welcome Back Senior...",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Please Enter Your Email...",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.info("The Credentials And REq Info", credentials, req);
        connectDb();
        const user = await User.findOne({ email: credentials?.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
  },
};
