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

import { UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser
    }
}
