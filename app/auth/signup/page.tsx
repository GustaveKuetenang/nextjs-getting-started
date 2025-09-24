import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
