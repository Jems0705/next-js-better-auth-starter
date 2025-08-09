import { useMutation } from "@tanstack/react-query";
import { authMutationOptions } from "../services/mutations";

export const useAuth = () => {
    return {
        signIn: () => {
            return useMutation({ ...authMutationOptions.signIn() });
        },
        signUp: () => {
            return useMutation({ ...authMutationOptions.signUp() });
        },
        signOut: () => {
            return useMutation({ ...authMutationOptions.signOut() });
        },
    };
};
