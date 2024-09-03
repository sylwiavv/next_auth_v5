"use server"

import * as z from "zod";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {RegisterSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedSchema = RegisterSchema.safeParse(values)

    if (!validatedSchema.success) {
        return {error: "Invalid fields!"}
    }

    const { password, email, name } = validatedSchema.data

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword,"hashedPassword");

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email is already in use!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //TODO: send verification emil token

    return {success: "Email sent"}
}