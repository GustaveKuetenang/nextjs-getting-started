import z from "zod";


export const ReviewSchema = z.object({
	name: z.string().min(2).max(50),
	review: z.string().min(10).max(500),
});

export const UpdateReviewSchema = z.object({
	name: z.string().min(2).max(50).optional(),
	review: z.string().min(10).max(500).optional(),
	reviewId: z.string(),
	star: z.number().optional(),
});


export type ReviewDTO = z.infer<typeof ReviewSchema> & {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	star: number | null;
};
