"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../hooks/use-auth";
import { toast } from "sonner";

export const SignOut = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useAuth().signOut();

    const handleSignOut = async () => {
        try {
            const response = await mutateAsync();

            if (!response.success) {
                toast.error(response.message);

                return;
            }

            toast.success(response.message);

            router.push("/sign-in");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    };

    return (
        <Button variant="outline" onClick={handleSignOut} disabled={isPending}>
            {isPending ? (
                <Loader2Icon className="animate-spin" />
            ) : (
                <>
                    Sign out <LogOutIcon />
                </>
            )}
        </Button>
    );
};
