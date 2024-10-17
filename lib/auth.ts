import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import authConfig from "@/auth.config";

// Extend the default session interface to include additional user properties
declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: {
      id: string;
      connectedProviders: string[];
    } & DefaultSession["user"];
  }
}

// Initialize NextAuth with custom configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    error: "/login/error",
  },
  events: {
    // Event triggered when a user links a new account
    async linkAccount({ user, account }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          connectedProviders: {
            push: account.provider,
          },
        },
      });
    },
  },
  callbacks: {
    // Callback to modify the session object
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.connectedProviders && session.user) {
        session.user.connectedProviders = token.connectedProviders as string[];
      }
      return session;
    },
    // Callback to modify the JWT token
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        // On sign-in, fetch connected providers from the database
        token.connectedProviders = await prisma.user
          .findUnique({
            where: { id: user.id },
            select: { connectedProviders: true },
          })
          .then((user) => user?.connectedProviders || []);
      }
      if (account) {
        // Add the new account provider to the token
        token.connectedProviders = [
          ...((token.connectedProviders as string[]) || []),
          account.provider,
        ];
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
