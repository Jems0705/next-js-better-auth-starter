import z from "zod";
import { signInSchema } from "../schema/sign-in-schema";
import { signUpSchema } from "../schema/sign-up-schema";
import { requestResetPasswordSchema } from "../schema/request-password-reset-schema";
import { resetPasswordSchema } from "../schema/reset-password-schema";

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type RequestPasswordResetSchemaType = z.infer<
    typeof requestResetPasswordSchema
>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
