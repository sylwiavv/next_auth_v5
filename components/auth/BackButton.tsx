import Link from "next/link";

'use-client'

import {Button} from "@/components/ui/button";
import React from 'react';

interface BackButton {
    label: string,
    href: string
}

export const BackButton = ({label, href}: BackButtonProps) => {
    return (
        <Button variant="link" className="font-normal w-full"><Link href={href}>{label}</Link></Button>
    );
}