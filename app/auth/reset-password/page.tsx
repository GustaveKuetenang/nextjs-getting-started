// "use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ResetPasswordForm } from "./reset-password-form";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;

  const { token } = searchParams;

  if (!token) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertTitle>Invalid token</AlertTitle>
          <AlertDescription>
            This reset link is not valid. It may be incomplete or has been
            altered. Please make sure you copied the full link, or request a new
            password-reset email and try again. If the issue persists, contact
            support.
          </AlertDescription>
        </Alert>

        <Link href="/auth/forget-password" className={buttonVariants({})}>
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  );
}
