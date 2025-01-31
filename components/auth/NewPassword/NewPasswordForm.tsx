'use client'

import { newPassword } from '@/actions/new-password'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { FormError } from '@/components/auth/FormError'
import { FormSuccess } from '@/components/auth/FormSuccess'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const cardWrapperPropsValues = {
        headerLabel: 'Enter a new password',
        backButtonHref: '/auth/login',
        backButtonLabel: 'Back to login',
        showSocial: false,
    }

    const { headerLabel, backButtonLabel, backButtonHref, showSocial } =
        cardWrapperPropsValues

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            newPassword(values, token).then((data) => {
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
            showSocial={showSocial}
        >
            <Form {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error as string} />
                    <FormSuccess message={success as string} />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Send a new password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
