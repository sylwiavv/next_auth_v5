'use server'

import { UserRole } from '@prisma/client'
import { currentUserRole } from '../lib/auth'

export const admin = async () => {
    const role = await currentUserRole()

    if (role === UserRole.ADMIN) {
        return { success: 'Allowed' }
    }

    return { error: 'Forbidden' }
}
