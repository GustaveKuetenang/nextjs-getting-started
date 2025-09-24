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

const EditProfileSchema = z.object({
  name: z.string(),
  lastName: z.string().optional(),
  username: z.string(),
});

export function EditProfileForm(props: {
  defaultValues: z.infer<typeof EditProfileSchema>;
}) {
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: props.defaultValues,
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    startTransition(async () => {
      await authClient.updateUser(
        {
          name: values.name,
          lastName: values.lastName,
          username: values.username,
        },
        {
          onSuccess: () => {
            toast.success("Profile edited.");
            router.push("/auth");
            router.refresh();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SignInButton isPending={isPending} />
      </form>
    </Form>
  );
}

const SignInButton = (props: { isPending: boolean }) => {
  if (props.isPending) {
    return (
      <Button disabled type="button">
        Saving...
      </Button>
    );
  }

  return <Button type="submit">Save</Button>;
};
