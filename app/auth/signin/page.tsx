import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground">
          {"Do'nt have an account yet? "}
          <Link className="text-blue-500" href="/auth/signup">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
