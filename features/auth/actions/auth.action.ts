"use server";

import { auth } from "@/lib/auth";
import { SignInSchemaType, SignUpSchemaType } from "../types/auth-types";
import { headers } from "next/headers";
import { ApiResponse } from "@/types";

export const signIn = async (data: SignInSchemaType): Promise<ApiResponse> => {
    const res = await auth.api.signInEmail({
        body: { email: data.email, password: data.password },
        asResponse: true,
    });

    if (!res.ok) {
        const errorData: {
            code: string;
            message: string;
        } = await res.json();

        return {
            success: false,
            message: errorData.message,
            code: errorData.code,
        };
    }

    return {
        success: true,
        message: "Signed in successfully.",
    };
};

export const signUp = async (data: SignUpSchemaType) => {
    const res = await auth.api.signUpEmail({
        body: {
            email: data.email,
            password: data.password,
            name: data.confirmPassword,
        },
        asResponse: true,
    });

    if (!res.ok) {
        const errorData: {
            code: string;
            message: string;
        } = await res.json();

        return {
            success: false,
            message: errorData.message,
            code: errorData.code,
        };
    }

    return {
        success: true,
        message: "Signed up successfully.",
    };
};

export const signOut = async () => {
    const res = await auth.api.signOut({
        asResponse: true,
        headers: await headers(),
    });

    if (!res.ok) {
        const errorData: {
            code: string;
            message: string;
        } = await res.json();

        return {
            success: false,
            message: errorData.message,
            code: errorData.code,
        };
    }

    return {
        success: true,
        message: "Signed out successfully.",
    };
};

export const requestPasswordReset = async (email: string) => {
    const res = await auth.api.requestPasswordReset({
        body: {
            email,
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
        },
        asResponse: true,
    });

    if (!res.ok) {
        const errorData: {
            code: string;
            message: string;
        } = await res.json();

        return {
            success: false,
            message: errorData.message,
            code: errorData.code,
        };
    }

    return {
        success: true,
        message: "Request password reset sent successfully.",
    };
};

export const resetPassword = async ({
    password,
    token,
}: {
    password: string;
    token: string | null;
}) => {
    if (!token) {
        return {
            success: false,
            message: "No reset token found.",
            code: "MISSING_RESET_TOKEN",
        };
    }

    const res = await auth.api.resetPassword({
        body: { newPassword: password, token },
        asResponse: true,
    });

    if (!res.ok) {
        const errorData: {
            code: string;
            message: string;
        } = await res.json();

        return {
            success: false,
            message: errorData.message,
            code: errorData.code,
        };
    }

    return {
        success: true,
        message: "Password has been change successfully.",
    };
};

export const currentUser = async () => {
    try {
        const res = await auth.api.getSession({ headers: await headers() });

        if (!res?.session) {
            throw Error("Unauthenticated.");
        }

        return res.user;
    } catch (err) {
        const e = err as Error;
        return {
            success: false,
            error: e.message,
            code: "INTERNAL_ERROR",
        };
    }
};
