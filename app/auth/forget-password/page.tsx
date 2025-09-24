import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgetPasswordForm } from "./forget-password-form";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Enter the email associated with your account and we’ll send you a
          password reset link. The link expires in 15 minutes. Check your
          spam/junk folder if you don’t see it. If you signed up with
          Google/SSO, use that option instead. Need help? Contact support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}
