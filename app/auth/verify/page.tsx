import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function VerifyPage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const { email } = searchParams;

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle>Important: chek your email</AlertTitle>
        {email && (
          <AlertDescription>
            We sent an email to <strong>{email}</strong>
          </AlertDescription>
        )}
      </Alert>
      <div>
        <Link href="/auth/forget-password" className={buttonVariants({})}>
          {"Didn't receive the link? Resend "}
        </Link>
      </div>
    </div>
  );
}
