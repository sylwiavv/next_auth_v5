import React from 'react';
import {auth, signOut} from '@/auth'
import {Button} from "@/components/ui/button";

const Settings = async () => {
    const session = await auth()

    const user = JSON.stringify(session)

    console.log(session, "SESSION");
    return (
        <div className="p-3">
            {user}
            <form action={
                async () => {
                    "use server";
                    await signOut()
                }
            }>
                <Button className="my-2" variant="secondary" type="submit">Sign out</Button>
            </form>
        </div>
    );
}

export default Settings