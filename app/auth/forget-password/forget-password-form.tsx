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

const ForgetPasswordSchema = z.object({
  email: z.email(),
});

export function ForgetPasswordForm() {
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    startTransition(async () => {
      await authClient.forgetPassword(
        {
          email: values.email,
          redirectTo: "/auth/reset-password",
        },
        {
          onSuccess: () => {
            router.push(`/auth/verify?email=${values.email}`);
            toast.success(`Password reset link send to ${values.email}`);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ForgetPasswordButton isPending={isPending} />
      </form>
    </Form>
  );
}

const ForgetPasswordButton = (props: { isPending: boolean }) => {
  if (props.isPending) {
    return (
      <Button disabled type="button">
        Sending...
      </Button>
    );
  }

  return <Button type="submit">Send link</Button>;
};
