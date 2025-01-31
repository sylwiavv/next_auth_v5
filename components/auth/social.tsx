// // 'use client'
// import React from 'react';
// import {FcGoogle} from "react-icons/fc";
// import {FaGithub} from "react-icons/fa";
// import {Button} from "@/components/ui/button";
// import {signIn} from "next-auth/react";
// import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
// import {googleAuthenticate} from "@/lib/googleAuth";
//
// const buttonsClassName = "w-full p-2"
// const iconsClassName = "h-5 w-5"
//
// const BUTTONS = [
//     {
//         size: "large",
//         variant: "outline",
//         className: buttonsClassName,
//         icon: <FcGoogle className={iconsClassName} />,
//         provider: "google"
//     },
//     {
//         size: "large",
//         variant: "outline",
//         className: buttonsClassName,
//         icon: <FaGithub className={iconsClassName} />,
//         provider: "github"
//     }
// ]
//
// export const Social = () => {
//     const onClick = (provider: string) => {
//         signIn("google")
//         // signIn(provider, {
//         //     callbackUrl: DEFAULT_LOGIN_REDIRECT
//         // })
//     }
//
//     return (
//         <div className="flex items-center w-full gap-x-2">
//             {BUTTONS.map(({size, variant, className, icon, provider}, index) => (
//                 <Button key={index} size={size} className={className} variant={variant} onClick={() => googleAuthenticate(provider)}>
//                     {icon}
//                 </Button>
//             ))}
//         </div>
//     );
// }
'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick('google')}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick('github')}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}
