import { EditReviewName } from "@/components/edit-review-name";
import ReviewStar from "@/components/review-star";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function Page() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const setNewStar = async (reviewId: string, star: number) => {
    "use server";

    // TODO: Remove in production and une react-query
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.review.update({
      where: { id: reviewId },
      data: { star },
    });

    revalidatePath("/reviews");
  };

  const setReviewName = async (reviewId: string, name: string) => {
    "use server";

    if (name.trim() === "") {
      revalidatePath("/reviews");
      return;
    }

    // TODO: Remove in production and une react-query
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.review.update({
      where: { id: reviewId },
      data: { name },
    });

    revalidatePath("/reviews");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.map((review) => (
          <Card key={review.id} className="mb-4">
            <CardHeader>
              <EditReviewName
                className="text-lg font-bold"
                setName={setReviewName.bind(null, review.id)}
              >
                {review.name}
              </EditReviewName>
              {review.star && (
                <ReviewStar
                  setNewStar={setNewStar.bind(null, review.id)}
                  star={review.star}
                />
              )}
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>

      <CardFooter>
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <LongLoadingCOmponent />
        </Suspense>
      </CardFooter>
    </Card>
  );
}

const LongLoadingCOmponent = async () => {
  const reviews = await prisma.review.count();

  await new Promise((resolve) => setTimeout(resolve, 4000));

  return <div>There are {reviews} reviews</div>;
};
