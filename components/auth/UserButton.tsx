'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ExitIcon } from '@radix-ui/react-icons'
import { FaUser } from 'react-icons/fa'
import { LogoutButton } from './logout-button'

export const UserButton = () => {
    const currentUser = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={currentUser?.image || ''} />
                    <AvatarFallback>
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuLabel>
                    {currentUser?.name?.toUpperCase()}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="w-4 h-4 mr-1" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
