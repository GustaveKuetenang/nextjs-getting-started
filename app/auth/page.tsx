import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { cn } from "@/lib/utils";
import { CheckCircle, Edit2 } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="group">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>User profile</CardTitle>
        <div className="group-hover:opacity-100 opacity-0">
          <Link
            href="/auth/edit-profile"
            className={cn(
              "",
              buttonVariants({ variant: "outline", size: "sm" })
            )}
          >
            <Edit2 className="size-3 text-muted-foreground" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">First Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Last Name</span>
            <span>{user.lastName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Username</span>
            <span>{user.username}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              Email{" "}
              {!user.emailVerified ? (
                <CheckCircle className="size-4 text-green-500" />
              ) : (
                ""
              )}
            </span>

            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
