export const QueryKeys = {
    CURRENT_USER: ["auth", "current-user"],
} as const;

export const MutationKeys = {
    SIGN_IN: ["auth", "sign-in"],
    SIGN_UP: ["auth", "sign-up"],
    SIGN_OUT: ["auth", "sign-out"],
} as const;
