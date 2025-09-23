import z from "zod";


export const ReviewSchema = z.object({
	name: z.string().min(2).max(50),
	review: z.string().min(10).max(500),
});
