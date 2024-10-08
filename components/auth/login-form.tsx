'use client'

import React, {useState} from 'react';
import {CardWrapper} from "@/components/auth/CardWrapper";
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/auth/FormError";
import {FormSuccess} from "@/components/auth/FormSuccess";
import {login} from "@/actions/login";
import {useTransition} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError =  searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : ""

    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const cardWrapperPropsValues = {
        headerLabel: "Welcome back!",
        backButtonHref: "/auth/register",
        backButtonLabel: "Don't have an account?",
        showSocial: true
    };

    const {headerLabel, backButtonLabel, backButtonHref, showSocial} = cardWrapperPropsValues;

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error)
                // TODO: Add when we add 2FA
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="*******" type="password" />
                                    </FormControl>
                                    <Button variant="link" size="sm" asChild className="px-0 font-normal">
                                        <Link href="/auth/reset" className="text-gray-500">Forgot password?</Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                    </div>
                    <FormError message={error as string || urlError} />
                    <FormSuccess message={success as string} />

                    <Button disabled={isPending}  type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
