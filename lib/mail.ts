import { Resend } from "resend"
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    const myEmail = 'sylwiavv@gmail.com'

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [myEmail],
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    });

    // await resend.emails.send({
    //     from: "sylwiavv@gmail.com",
    //     to: email[0],
    //     subject: "Confirm your email",
    //     html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    // })
}