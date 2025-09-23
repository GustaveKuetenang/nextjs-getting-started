import { EditReviewName } from "@/components/edit-review-name";
import { PageLayout } from "@/components/page-layout";
import { ReviewForm } from "@/components/review-form";
import ReviewStar from "@/components/review-star";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Home() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const changeStar = async (reviewId: string, star: number) => {
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
    <PageLayout>
      <h1>getting started with Next.js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ThemeSelector />

      <div>
        {reviews.map((review) => (
          <Card key={review.id} className="mb-4 group relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="opacity-0 group-hover:opacity-100 cursor-pointer"
                  formAction={async () => {
                    "use server";
                    await prisma.review.delete({
                      where: { id: review.id },
                    });
                    revalidatePath("/");
                  }}
                >
                  <Trash2 />
                </Button>
              </form>
            </div>
            <CardHeader>
              <EditReviewName
                className="text-lg font-bold"
                setName={setReviewName.bind(null, review.id)}
              >
                {review.name}
              </EditReviewName>
              {review.star && (
                <ReviewStar
                  onStarChange={changeStar.bind(null, review.id)}
                  star={review.star}
                />
              )}
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
