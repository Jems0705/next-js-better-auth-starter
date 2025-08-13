import z from "zod";

export const requestResetPasswordSchema = z.object({
    email: z.email(),
});
