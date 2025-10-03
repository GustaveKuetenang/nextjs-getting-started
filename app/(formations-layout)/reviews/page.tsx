import {
  deleteReviewAction,
  getReviewsSafeAction,
  updateReviewAction,
} from "@/actions/review.action";
import { EditReviewName } from "@/components/edit-review-name";
import { ReviewForm } from "@/components/review-form";
import ReviewStar from "@/components/review-star";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Review } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const reviews = await getReviewsSafeAction();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await updateReviewAction({
      reviewId,
      star,
    });

    revalidatePath("/reviews");
  };

  const setReviewName = async (reviewId: string, name: string) => {
    "use server";

    await updateReviewAction({
      reviewId,
      name,
    });

    revalidatePath("/reviews");
  };

  return (
    <>
      <div>
        {reviews.data?.map((review: Review) => (
          <Card key={review.id} className="mb-4 group relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="opacity-0 group-hover:opacity-100 cursor-pointer"
                  formAction={async () => {
                    "use server";
                    await deleteReviewAction({ reviewId: review.id });
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
    </>
  );
}
