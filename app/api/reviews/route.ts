import prisma from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const reviewSchema =
	z.object({
		name: z.string(),
		review: z.string()
	});


export const GET = async (request: NextRequest) => {
	const reviews = await prisma.review.findMany({
		orderBy: {
			createdAt: "desc",
		}
	});

	return NextResponse.json({
		data: reviews,
	})
}

export const POST = async (request: NextRequest) => {

	const body = await request.json();
	const { name, review } = reviewSchema.parse(body);

	if (name.trim() === "" || review.trim() === "") {
		throw new SafeError("Invalid data");
	}

	const newReview = await prisma.review.create({
		data: { name, review, star: 4 },
	});

	return NextResponse.json({
		review: newReview,
	});
}
