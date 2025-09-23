"use server";

import prisma from "@/lib/prisma";
import { ReviewSchema } from "@/lib/review.schema";
import { actionClient, SafeError } from "@/lib/safe-action-client";
import { revalidatePath } from "next/cache";


export const addReviewSafeAction = actionClient
	.inputSchema(ReviewSchema)
	.action(async ({ parsedInput: { name, review } }) => {

		if (name.trim() === "" || review.trim() === "") {
			throw new SafeError("Invalid data");
			// revalidatePath("/");
		}

		const newReview = await prisma.review.create({
			data: { name, review, star: 4 },
		});

		revalidatePath("/");

		return newReview;
	})



