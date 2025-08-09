import z from "zod";
import { signInSchema } from "../schema/sign-in-schema";
import { signUpSchema } from "../schema/sign-up-schema";

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
