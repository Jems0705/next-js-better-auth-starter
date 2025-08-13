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
import { RequestPasswordResetSchemaType } from "../types/auth-types";
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
import { useRouter } from "next/navigation";
import { requestResetPasswordSchema } from "../schema/request-password-reset-schema";

export function RequestPasswordResetForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const { mutateAsync, isPending } = useAuth().requestPasswordReset();

    const form = useForm<RequestPasswordResetSchemaType>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(requestResetPasswordSchema),
    });

    const { control, handleSubmit, setError } = form;

    const onSubmit = async (data: RequestPasswordResetSchemaType) => {
        try {
            const response = await mutateAsync(data.email);

            if (!response.success) {
                toast.error(response.message);
                setError("email", { message: undefined });

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
                    <CardTitle className="text-xl">
                        Request Password Reset
                    </CardTitle>
                    <CardDescription>Send a password reset</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
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
