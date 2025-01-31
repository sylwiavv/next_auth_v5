'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode
    mode?: 'modal' | 'redirect'
}

export const LoginButton = ({ children, mode = 'redirect' }) => {
    const router = useRouter()

    const onClick = () => {
        router.push('/auth/login')
    }

    if (mode === 'modal') {
        return <h1>Modal</h1>
    }

    return <span onClick={onClick}>{children}</span>
}
