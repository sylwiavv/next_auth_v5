'use client'
// CLIENT COMPONENT
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { SettingsSchema } from '../../../schemas'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GearIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { settings } from '../../../actions/settings'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { UserRole } from '@prisma/client'
import { FormError } from '../../../components/auth/FormError'
import { FormSuccess } from '../../../components/auth/FormSuccess'
import { Button } from '../../../components/ui/button'
import { useCurrentUser } from '../../../hooks/useCurrentUser'

const Settings = () => {
    const user = useCurrentUser()

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    // const session = useSession(); // `useSession` must be wrapped in a <SessionProvider />
    // const user = useCurrentUser()

    // const onClick = () => {
    //     logout()
    // }

    const [isPending, startTransition] = useTransition()
    const { update } = useSession()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }

                    if (data.success) {
                        update()
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError('Something went wrong'))
            // newPassword(values, token).then((data) => {
            //     setError(data?.error)
            //     setSuccess(data?.success)
            // })
        })
    }

    return (
        <>
            <div className="break-all flex flex-col">
                <Card className="w-[600px]">
                    <CardHeader>
                        <p className="text-2xl font-semibold text-center">
                            <GearIcon />
                            Settings
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <Form {...form}>
                                <form
                                    className="space-y-6"
                                    onSubmit={form.handleSubmit(onSubmit)}
                                >
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="John Doe"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {user?.isOAuth === false && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="john.doe@example.com"
                                                                    type="email"
                                                                    disabled={
                                                                        isPending
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Password
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="******"
                                                                    type="password"
                                                                    disabled={
                                                                        isPending
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="newPassword"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                New Password
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="******"
                                                                    type="password"
                                                                    disabled={
                                                                        isPending
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )}
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel>
                                                    <Select
                                                        disabled={isPending}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value={
                                                                    UserRole.ADMIN
                                                                }
                                                            >
                                                                Admin
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={
                                                                    UserRole.USER
                                                                }
                                                            >
                                                                User
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {user?.isOAuth === false && (
                                            <FormField
                                                control={form.control}
                                                name="isTwoFactorEnabled"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>
                                                                Two Factor
                                                                Authentication
                                                            </FormLabel>
                                                            <FormDescription>
                                                                Enable two
                                                                factor
                                                                authentication
                                                                for your account
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                disabled={
                                                                    isPending
                                                                }
                                                                checked={
                                                                    field.value
                                                                }
                                                                onCheckedChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                    <Button disabled={isPending} type="submit">
                                        Save
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Settings

// SERVER COMPONENT
// import React from 'react';
// import {auth, signOut} from '@/auth'
// import {Button} from "@/components/ui/button";

// const Settings = async () => {
//     const session = await auth()

//     const user = JSON.stringify(session)
//     return (
//         <div className="p-3">
//             {user}
//             <form action={
//                 async () => {
//                     "use server";
//                     await signOut({ redirectTo: "/auth/login", redirect:true })
//                 }
//             }>
//                 <Button className="my-2" variant="secondary" type="submit">Sign out</Button>
//             </form>
//         </div>
//     );
// }

// export default Settings
