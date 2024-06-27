import React from 'react';
import {CardWrapper} from "@/components/auth/CardWrapper";

export const LoginForm = () => {
    const cardWrapperPropsValues = {
        headerLabel: "Welcome back!",
        backButtonHref: "/auth/register",
        backButtonLabel: "Dont have an account?",
        showSocial: true
    }
    
    const {headerLabel, backButtonLabel, backButtonHref, showSocial} = cardWrapperPropsValues

    return (
        <CardWrapper headerLabel={headerLabel} backButtonHref={backButtonHref} backButtonLabel={backButtonLabel}
                     showSocial={showSocial}>LoginForm</CardWrapper>
    );
}