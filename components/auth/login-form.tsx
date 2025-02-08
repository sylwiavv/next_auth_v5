'use client'

import { login } from '@/actions/login'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { FormError } from '@/components/auth/FormError'
import { FormSuccess } from '@/components/auth/FormSuccess'
import LoginFormFields from '@/components/auth/LoginFormFields'
import LoginFormTwoFactorFields from '@/components/auth/LoginFormTwoFactorFields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const LoginForm = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email already in use with different provider'
            : ''

    const [isPending, startTransition] = useTransition()

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const cardWrapperPropsValues = {
        headerLabel: 'Welcome back!',
        backButtonHref: '/auth/register',
        backButtonLabel: "Don't have an account?",
        showSocial: true,
    }

    const { headerLabel, backButtonLabel, backButtonHref, showSocial } =
        cardWrapperPropsValues

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: '',
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                    // setError(data?.error)
                    // // TODO: Add when we add 2FA
                    // setSuccess(data?.success)
                })
                .catch(() => {
                    setError('Something went wrong')
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
                        {!showTwoFactor && (
                            <LoginFormFields
                                form={form}
                                isPending={isPending}
                            />
                        )}
                        {showTwoFactor && (
                            <LoginFormTwoFactorFields
                                form={form}
                                isPending={isPending}
                            />
                        )}
                    </div>

                    <FormError message={(error as string) || urlError} />
                    <FormSuccess message={success as string} />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {showTwoFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
