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
"use client";
// CLIENT COMPONENT
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import ProtectedLayout from "./ProtectedLayout";

const Settings = () => {
  // const session = useSession(); // `useSession` must be wrapped in a <SessionProvider />
  const onClick = () => {
    logout();
  };

  return (
    <ProtectedLayout>

      <div className="break-all flex flex-col">
        {/* <form> */}
          <Button className="my-2" variant="secondary" onClick={onClick} >
            Sign out
          </Button>
        {/* </form> */}
        
      </div>
    </ProtectedLayout>
  );
};

export default Settings;
