import 'next-auth'

type UserRole = 'ADMIN' | 'USER'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface jwt {
        user: {
            role: UserRole
        }
    }

    interface session {
        user: {
            role: UserRole
        }
    }
}
