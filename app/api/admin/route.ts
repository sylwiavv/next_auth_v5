import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'
import { currentUserRole } from '../../../lib/auth'

export async function GET() {
    const role = await currentUserRole()
    if (role === UserRole.ADMIN) {
        return new NextResponse(null, { status: 200 })
    }
    return new NextResponse(null, { status: 403 })
}
