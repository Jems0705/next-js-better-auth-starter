import { SignOut } from "@/features/auth/components/sign-out";
import React from "react";

export default function DashboardPage() {
    return (
        <div className="min-h-svh grid place-items-center">
            <SignOut />
        </div>
    );
}
