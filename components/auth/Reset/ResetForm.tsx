'use client'

import React, {useState} from 'react';
import {CardWrapper} from "@/components/auth/CardWrapper";
import * as z from "zod";
import {ResetSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/auth/FormError";
import {FormSuccess} from "@/components/auth/FormSuccess";
import {login} from "@/actions/login";
import {useTransition} from "react";
import {reset} from "@/actions/reset";

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const cardWrapperPropsValues = {
        headerLabel: "Forgot your password",
        backButtonHref: "/auth/login",
        backButtonLabel: "Back to login"
    };

    const {headerLabel, backButtonLabel, backButtonHref, showSocial} = cardWrapperPropsValues;

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel={headerLabel}
            backButtonHref={backButtonHref}
            backButtonLabel={backButtonLabel}
            showSocial={showSocial}>
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending}  {...field} placeholder="ex@gmail.com" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}
                        />
                    </div>
                    <FormError message={error as string} />
                    <FormSuccess message={success as string} />

                    <Button disabled={isPending}  type="submit" className="w-full">Send reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
