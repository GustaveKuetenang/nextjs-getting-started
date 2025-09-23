"use client";

import { addReviewSafeAction } from "@/actions/review.action";
import { ReviewSchema } from "@/lib/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export function ReviewForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });

  const { executeAsync, hasErrored, result } = useAction(addReviewSafeAction, {
    onSuccess: () => {
      toast.success("Review created !");
    },
  });

  // const createReview = async (obj: { name: string; review: string }) => {
  //   await fetch("/api/reviews", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //   }).then((res) => res.json());

  //   router.refresh();
  // };

  async function onSubmit(values: z.infer<typeof ReviewSchema>) {
    await executeAsync(values);
    router.refresh();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>This public name for the review</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input placeholder="Review" {...field} />
              </FormControl>
              <FormDescription>Be honnest.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};
