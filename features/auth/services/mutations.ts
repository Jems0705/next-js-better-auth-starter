import { mutationOptions } from "@tanstack/react-query";
import {
    requestPasswordReset,
    resetPassword,
    signIn,
    signOut,
    signUp,
} from "../actions/auth.action";
import { MutationKeys } from "./keys";

export const authMutationOptions = {
    signIn: () =>
        mutationOptions({
            mutationKey: MutationKeys.SIGN_IN,
            mutationFn: signIn,
        }),
    signUp: () =>
        mutationOptions({
            mutationKey: MutationKeys.SIGN_UP,
            mutationFn: signUp,
        }),
    signOut: () =>
        mutationOptions({
            mutationKey: MutationKeys.SIGN_OUT,
            mutationFn: signOut,
        }),
    requestPasswordReset: () =>
        mutationOptions({
            mutationKey: MutationKeys.REQUEST_PASSWORD_RESET,
            mutationFn: requestPasswordReset,
        }),
    resetPassword: () =>
        mutationOptions({
            mutationKey: MutationKeys.RESET_PASSWORD,
            mutationFn: resetPassword,
        }),
};
