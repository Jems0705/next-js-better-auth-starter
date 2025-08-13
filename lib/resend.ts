import { CreateEmailOptions, Resend } from "resend";

const isDev = process.env.NODE_ENV === "development";

export async function sendEmail(options: CreateEmailOptions) {
    if (isDev) {
        console.log("Mock email sent:", options);
        return { id: "mock-email-id" };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    return resend.emails.send(options);
}
