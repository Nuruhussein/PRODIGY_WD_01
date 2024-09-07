import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
  },
};

export async function GET(req, res) {
  return await NextAuth(req, res, options);
}

export async function POST(req, res) {
  return await NextAuth(req, res, options);
}
