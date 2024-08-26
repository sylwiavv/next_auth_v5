'use client'

import React, {useState} from 'react';
import {CardWrapper} from "@/components/auth/CardWrapper";
import * as z from "zod";
import {RegisterSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/auth/FormError";
import {FormSuccess} from "@/components/auth/FormSuccess";
import {login} from "@/actions/login";
import {useTransition} from "react";
import {register} from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const cardWrapperPropsValues = {
        headerLabel: "Create an account",
        backButtonHref: "/auth/login",
        backButtonLabel: "Already have an account",
        showSocial: true
    };

    const {headerLabel, backButtonLabel, backButtonHref, showSocial} = cardWrapperPropsValues;

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)

                if (data?.success) {
                    console.log(form);
                    form.reset()
                }
            })
        })
    }

    console.log(success, "success");

    return (
        <CardWrapper
            headerLabel={headerLabel}
            backButtonHref={backButtonHref}
            backButtonLabel={backButtonLabel}
            showSocial={showSocial}
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}
                        />

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
                                    <FormMessage />
                                </FormItem>
                            )}/>


                    </div>
                    <FormError message={error as string} />
                    <FormSuccess message={success as string} />

                    <Button disabled={isPending}  type="submit" className="w-full">Register</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
