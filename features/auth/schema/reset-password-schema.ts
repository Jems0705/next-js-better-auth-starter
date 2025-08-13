import z from "zod";

export const resetPasswordSchema = z
    .object({
        newPassword: z.string(),
        confirmNewPassword: z.string(),
    })
    .refine((values) => values.newPassword === values.confirmNewPassword, {
        error: "Passwords must match.",
        path: ["confirmNewPassword"],
    });
