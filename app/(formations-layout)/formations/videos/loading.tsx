import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <header className="border-b -mx-4 px-4 pb-2">
        <Skeleton className="h-10 w-24" />
      </header>
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
