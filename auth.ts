import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/lib/db";
import authConfig from "@/auth.config"
import {getUserById} from "@/data/user";

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        // async signIn({user}) {
        //     const existingUser = await getUserById(user.id);
        //
        //     console.log(existingUser, "USER signIn")
        //
        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }
        //
        //     return true;
        // },
        async signIn({ user, account }) {
            // Allow OAuth without email verification

            if (account?.provider !== "credentials") {
                return true
            }

            const existingUser = await getUserById(user.id);

            // Prevent SignIn without email verification
            if (!existingUser?.emailVerified) {
                return false
            }

            // TODO: Add 2F check

            return true;
        },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})