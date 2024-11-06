import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const LoginFormFields = ({form, isPending}) => {
    return (
        <>
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input disabled={isPending}  {...field} placeholder="ex@gmail.com"
                                   type="email"/>
                        </FormControl>
                        <FormMessage/>
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
        </>
    );
}

export default LoginFormFields