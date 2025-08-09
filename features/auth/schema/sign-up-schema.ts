import z from "zod";

export const signUpSchema = z
    .object({
        name: z.string(),
        email: z.email(),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
        path: ["confirmPassword"],
        error: "Passwords must match.",
    });
