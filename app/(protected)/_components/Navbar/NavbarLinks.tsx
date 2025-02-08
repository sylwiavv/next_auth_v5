'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavbarLinks = () => {
    const pathname = usePathname()

    return (
        <div className="flex gap-x-2">
            <Button
                asChild
                variant={pathname === '/server' ? 'default' : 'outline'}
            >
                <Link href="/server">Server component</Link>
            </Button>
            <Button
                asChild
                variant={pathname === '/client' ? 'default' : 'outline'}
            >
                <Link href="/client">Client component</Link>
            </Button>
            <Button
                asChild
                variant={pathname === '/admin' ? 'default' : 'outline'}
            >
                <Link href="/admin">Admin</Link>
            </Button>
            <Button
                asChild
                variant={pathname === '/settings' ? 'default' : 'outline'}
            >
                <Link href="/settings">Settings</Link>
            </Button>
        </div>
    )
}
