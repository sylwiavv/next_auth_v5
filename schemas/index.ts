import * as z from "zod"

const EmailIsRequired = "Email i required";
const PasswordMinimumRequired = "Minimum 6 characters are required";
const PasswordMin = 6;

export const NewPasswordSchema = z.object({
    password: z.string().min(PasswordMin, {message: PasswordMinimumRequired}),
})

export const ResetSchema = z.object({
    email: z.string().email({message: EmailIsRequired}),
})

export const LoginSchema = z.object({
    email: z.string().email({message: EmailIsRequired}),
    password: z.string().min(1, {message: "Password is required"})
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(PasswordMin, {message: PasswordMinimumRequired}),
    name: z.string().min(1, {message: "Name is required"}),
})