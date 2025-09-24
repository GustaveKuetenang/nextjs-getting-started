import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { EditProfileForm } from "./edit-profile-form";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <EditProfileForm
          defaultValues={{
            name: user.name,
            username: user.username,
            lastName: user.lastName || undefined,
          }}
        />
      </CardContent>
    </Card>
  );
}
