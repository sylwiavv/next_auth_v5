import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = 'sylwiavv@gmail.com'

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [myEmail],
        subject: "2FA Code",
        html: `<p>Your 2FA Code: ${token}</p>`
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [myEmail],
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [myEmail],
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email. ${email}</p>`
    });

    // await resend.emails.send({
    //     from: "sylwiavv@gmail.com",
    //     to: email[0],
    //     subject: "Confirm your email",
    //     html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    // })
}