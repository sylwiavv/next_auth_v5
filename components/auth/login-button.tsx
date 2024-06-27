'use client'

import React from 'react';
import {useRouter} from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
           <h1>Modal</h1>
        );
    }

    return (
        <span onClick={onClick} children="cursor-pointer">{children}</span>
    );
}