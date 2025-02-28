'use client'

import { usePathname } from 'next/navigation'
import React, { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const SeoH1 = ({
    className = 'helo22',
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    const pathname = usePathname()

    const El = pathname === '/' ? 'h1' : 'span'

    return React.createElement(El, {
        ...props,
        className: cn('inline-block', className),
    })
}
