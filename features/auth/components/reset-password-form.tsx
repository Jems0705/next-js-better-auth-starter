"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchemaType } from "../types/auth-types";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordSchema } from "../schema/reset-password-schema";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { mutateAsync, isPending } = useAuth().resetPassword();

    const token = searchParams.get("token");

    const form = useForm<ResetPasswordSchemaType>({
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        resolver: zodResolver(resetPasswordSchema),
    });

    const { control, handleSubmit, setError } = form;

    const onSubmit = async (data: ResetPasswordSchemaType) => {
        try {
            const response = await mutateAsync({
                password: data.newPassword,
                token,
            });

            if (!response.success) {
                toast.error(response.message);
                setError("newPassword", { message: undefined });
                setError("confirmNewPassword", { message: undefined });

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
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>Set your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    New password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="confirmNewPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm new password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <Loader2Icon className="animate-spin" />
                                        ) : (
                                            "Request Password Reset"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
