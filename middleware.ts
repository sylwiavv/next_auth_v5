import authConfig from '@/auth.config'
import {
    DEFAULT_LOGIN_PAGE,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return // This is okay as it simply doesn't do anything, matching `void`.
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            // If already logged in, redirect to the default page
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return // This matches `void` for when no action is needed
    }

    if (!isLoggedIn && !isPublicRoute) {
        // Redirect to login page if not logged in
        return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl))
    }

    return // Return void if no action needed
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
