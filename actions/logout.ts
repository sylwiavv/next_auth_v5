'use server'

import { signOut } from "@/auth"
import React from 'react'

export const logout = async () => {
    //some server stuff before logout
    await signOut({redirectTo: "/auth/login" })
}
