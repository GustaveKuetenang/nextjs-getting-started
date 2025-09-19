import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-4/6" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-3/6" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-3/6" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-3/6" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}
