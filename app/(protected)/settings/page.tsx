import React from 'react';
import {auth, signOut} from '@/auth'
import {Button} from "@/components/ui/button";

const Settings = async () => {
    const session = await auth()

    console.log(session, "SESSION");
    return (
        <div>{JSON.stringify(session)}
            <form action={
                async () => {
                    "use server";
                    await signOut()
                }
            }>
                <Button type="submit">Sign out</Button>
            </form>
        </div>
    );
}

export default Settings