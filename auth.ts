import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/lib/db";
import authConfig from "@/auth.config"

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session({session, token}){
            console.log("session", token)
            return session;
        },
        async jwt({token}) {
            console.log(token, "TOKEN");

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})