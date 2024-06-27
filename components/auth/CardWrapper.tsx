
'use-client'
import {BackButton} from "@/components/auth/BackButton";
import {Social} from "@/components/auth/social";


import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Header} from "@/components/auth/header";

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}) => {
    const headerLabelTextMain = "Auth Header Text"

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} headerLabel={headerLabelTextMain} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
}