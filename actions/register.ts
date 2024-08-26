"use client"

import {RegisterSchema} from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
const validatedSchema = RegisterSchema.safeParse(values)

    if (!validatedSchema.success) {
        return {error: "Invalid fields!"}
    }

    return {success: "Email sent"}
}