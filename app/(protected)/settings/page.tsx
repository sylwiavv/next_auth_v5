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
import UserAvatar from "@/components/auth/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import ProtectedLayout from "./ProtectedLayout";

const Settings = () => {
  // const session = useSession(); // `useSession` must be wrapped in a <SessionProvider />
  const onClick = () => {
    logout();
  };

  const inovices = [
    { number: "AB", ammount: 3000, companyId: 3 },
    { number: "AC", ammount: 200, companyId: 1 },
    { number: "AGG", ammount: 2200, companyId: 2 },
    { number: "AL", ammount: 500, companyId: 3 },
    { number: "ABLLL", ammount: 3000, companyId: 1 },
    { number: "AS", ammount: 3500, companyId: 1 },
    { number: "AB", ammount: 3000, companyId: 3 },
    { number: "ADD", ammount: 3070, companyId: 2 },
    { number: "AB", ammount: 3000, companyId: 1 },
    { number: "AO", ammount: 3000, companyId: 1 },
    { number: "AJJJ", ammount: 3700, companyId: 2 },
    { number: "KB", ammount: 1000, companyId: 1 },
    { number: "ABSSS", ammount: 3700, companyId: 2 },
    { number: "KLB", ammount: 700, companyId: 1 },
    { number: "SSB", ammount: 9990, companyId: 3 },
  ];

   const handleClick = (e) => {
    console.log("klikam element", e.currentTarget.tagName)
   }

  return (
    <ProtectedLayout>
      <div className="break-all flex flex-col">
        <UserAvatar imageSrc="https://i.pinimg.com/736x/86/cf/d0/86cfd0cd2e5bb21b377b972f9931e939.jpg" />

        {/* <form> */}
        <Button className="my-2" variant="secondary" onClick={onClick}>
          Sign out
        </Button>
        {/* </form> */}
      
      </div>
    </ProtectedLayout>
  );
};

export default Settings;
