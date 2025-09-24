"use server";

import prisma from "@/lib/prisma";
import { ReviewSchema, UpdateReviewSchema } from "@/lib/review.schema";
import { actionUser } from "@/lib/safe-action-client";
import z from "zod";

export const getReviewsSafeAction = actionUser
	.action(async ({ ctx }) => {
		const reviews = await prisma.review.findMany({
			orderBy: { createdAt: "desc" },
		});

		return reviews;
	})


export const addReviewSafeAction = actionUser
	.inputSchema(ReviewSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const { name, review } = input;

		const newReview = await prisma.review.create({
			data: {
				name,
				review,
				star: 4,
				userId: ctx.user.id
			},
		});

		return newReview;
	})

export const updateReviewAction = actionUser
	.inputSchema(UpdateReviewSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const { reviewId, ...updateData } = input;
		await prisma.review.update({
			where: {
				id: reviewId,
				userId: ctx.user.id
			},
			data: updateData
		})
	});


export const deleteReviewAction = actionUser
	.inputSchema(
		z.object({
			reviewId: z.string()
		})
	)
	.action(async ({ parsedInput: input, ctx }) => {
		await prisma.review.delete({
			where: {
				id: input.reviewId,
				userId: ctx.user.id
			}
		})
	});

