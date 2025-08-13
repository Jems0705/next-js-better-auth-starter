import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { nextCookies } from "better-auth/next-js";
import schema from "@/db/schema";
import { sendEmail } from "./resend";
import { RequestPasswordResetEmail } from "@/features/auth/components/request-password-reset-email";

export const auth = betterAuth({
    session: {
        expiresIn: 60 * 60 * 24 * 1, // 1 day
    },
    socialProviders: {
        google: {
            // prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }) => {
            console.log("[RESET URL]:", url);

            await sendEmail({
                from: "onboarding@resend.dev",
                to: [user.email],
                subject: "Hello from Next.js",
                react: RequestPasswordResetEmail({
                    resetUrl: url,
                    userName: user.name,
                    requestTimeISO: new Date().toISOString(),
                }),
            });
        },
        onPasswordReset: async ({ user }) => {
            console.log(`Password for user ${user.email} has been reset.`);
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: { ...schema },
    }),
    plugins: [nextCookies()],
});
