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
'use client'
// CLIENT COMPONENT
import UserAvatar from '@/components/auth/UserAvatar/UserAvatar'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { logout } from '../../../actions/logout'
import ProtectedLayout from './ProtectedLayout'

const Settings = () => {
    // const session = useSession(); // `useSession` must be wrapped in a <SessionProvider />
    const session = useSession()

    const onClick = () => {
        logout()
    }

    console.log(session)
    const sessionUser = session.data?.user

    return (
        <ProtectedLayout>
            <div className="break-all flex flex-col">
                <p>{sessionUser.name}</p>
                <p>{sessionUser.email}</p>
                <UserAvatar imageSrc={sessionUser.image} />

                {/* <form> */}
                <Button className="my-2" variant="secondary" onClick={onClick}>
                    Sign out
                </Button>
                {/* </form> */}
            </div>
        </ProtectedLayout>
    )
}

export default Settings
