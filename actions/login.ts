"use client"

import {LoginSchema} from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
const validatedSchema = LoginSchema.safeParse(values)
    if (!validatedSchema.success) {
        return {error: "Invalid fields!"}
    }

    return {success: "Email sent"}
}