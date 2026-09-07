import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: {
            studentProfile: { select: { id: true } },
            academicianProfile: { select: { id: true } },
            industryProfile: { select: { id: true } },
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("No account found with this email.");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        // Record last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          avatarUrl: user.avatarUrl,
          studentProfileId: user.studentProfile?.id || null,
          academicianProfileId: user.academicianProfile?.id || null,
          industryProfileId: user.industryProfile?.id || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.status = user.status;
        token.avatarUrl = user.avatarUrl;
        token.studentProfileId = user.studentProfileId;
        token.academicianProfileId = user.academicianProfileId;
        token.industryProfileId = user.industryProfileId;
      }

      // Allow client-side updates (e.g. after profile completion)
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.avatarUrl) token.avatarUrl = session.avatarUrl;
        if (session.studentProfileId) token.studentProfileId = session.studentProfileId;
        if (session.academicianProfileId) token.academicianProfileId = session.academicianProfileId;
        if (session.industryProfileId) token.industryProfileId = session.industryProfileId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role as Role;
        session.user.status = token.status;
        session.user.avatarUrl = token.avatarUrl;
        session.user.studentProfileId = token.studentProfileId;
        session.user.academicianProfileId = token.academicianProfileId;
        session.user.industryProfileId = token.industryProfileId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "skillbridge-super-secret-jwt-key-sih2026-production",
};
