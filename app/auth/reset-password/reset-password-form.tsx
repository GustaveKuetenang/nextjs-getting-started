"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordSchema = z.object({
  newPassword: z.string(),
});

export function ResetPasswordForm(props: { token: string }) {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    startTransition(async () => {
      await authClient.resetPassword(
        {
          newPassword: values.newPassword,
          token: props.token,
        },
        {
          onSuccess: () => {
            router.push(`/auth/signin`);
            toast.success("Password reset, please sign in");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ResetPasswordButton isPending={isPending} />
      </form>
    </Form>
  );
}

const ResetPasswordButton = (props: { isPending: boolean }) => {
  if (props.isPending) {
    return (
      <Button disabled type="button">
        Resetting...
      </Button>
    );
  }

  return <Button type="submit">Reset</Button>;
};
