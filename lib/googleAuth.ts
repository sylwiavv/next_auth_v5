"use server"
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export async function googleAuthenticate(
    provider: string
    // prevState: string | undefined,
    // formData: FormData,
) {
    // signIn(provider, {
    //     callbackUrl: DEFAULT_LOGIN_REDIRECT
    // })
    console.log("HELLO")
    try {
        await signIn(provider,  {
                callbackUrl: DEFAULT_LOGIN_REDIRECT
            });
    } catch (error) {
        if (error instanceof AuthError) {
            return 'google log in failed'
        }
        throw error;
    }
}