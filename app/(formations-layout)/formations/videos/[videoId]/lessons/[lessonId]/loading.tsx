import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/6" />
      </CardHeader>
      <CardContent className="my-4">
        <Skeleton className="h-4 w-16" />
      </CardContent>
    </Card>
  );
}
