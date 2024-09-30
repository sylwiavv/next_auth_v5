"use client"

import React, {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation'
import {CardWrapper} from "@/components/auth/CardWrapper";
import {BeatLoader} from "react-spinners";
import {newVerification} from "@/actions/new-verification";
import {FormError} from "@/components/auth/FormError";
import {FormSuccess} from "@/components/auth/FormSuccess";


const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setsSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams()
    const token = searchParams.get("token")


    const onSubmit = useCallback(() => {
        // if we already have success or error break (to avoid showing immediately error after success)
        if (success || error) return;
        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token).then((data) => {
            setsSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError("Something went wrong!")
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper headerLabel="Conforming your verification" backButtonLabel="Back to login"
                     backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                {success && <FormSuccess message={success}/>}
                {!success && error && <FormError message={error}/>}
            </div>

        </CardWrapper>
    );
}

export default NewVerificationForm