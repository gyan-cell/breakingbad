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
      connectDb();
      try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await User.create({ email: user.email, name: user.name });
        return true;
      } catch (error) {
        console.log("The error is ", error);
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
      clientSecret: process.env.GITHUB_CLIENT_PASSWORD!,
    }),
  ],
};
