export interface Lesson {
	id: string;
	title: string;
	description: string;
}

export interface Video {
	id: string;
	title: string;
	lessons: Lesson[];
}

export const VIDEOS: Video[] = [
	{
		id: "video-1",
		title: "Fundamentals",
		lessons: [
			{
				id: "lesson-1-1",
				title: "Introduction to Next.js",
				description:
					"Learn the basics of Next.js, including its features and benefits.",
			},
			{
				id: "lesson-1-2",
				title: "Setting up a Next.js Project",
				description:
					"Step-by-step guide to creating a new Next.js project from scratch.",
			},
			{
				id: "lesson-1-3",
				title: "Pages and Routing",
				description:
					"Understand how to create pages and implement routing in Next.js.",
			},
			{
				id: "lesson-1-4",
				title: "Static Generation vs Server-Side Rendering",
				description:
					"Explore the differences between static generation and server-side rendering.",
			},
			{
				id: "lesson-1-5",
				title: "API Routes in Next.js",
				description:
					"Learn how to create API endpoints using Next.js API routes.",
			},
		],
	},
	{
		id: "video-2",
		title: "Server Component + Prisma",
		lessons: [
			{
				id: "lesson-2-1",
				title: "Introduction to Server Components",
				description:
					"Learn about the concept of server components in Next.js and their advantages.",
			},
			{
				id: "lesson-2-2",
				title: "Setting up Prisma with Next.js",
				description:
					"Step-by-step guide to integrating Prisma into your Next.js project.",
			},
			{
				id: "lesson-2-3",
				title: "Creating a Database Schema with Prisma",
				description:
					"Learn how to define and create database schemas using Prisma in Next.js.",
			},
		],
	},
	{
		id: "video-3",
		title: "Server Function + Mutation",
		lessons: [
			{
				id: "lesson-3-1",
				title: "Understanding Server Functions in Next.js",
				description:
					"Learn about server functions in Next.js and how they differ from traditional API routes.",
			},
			{
				id: "lesson-3-2",
				title: "Implementing Mutations with Server Functions",
				description:
					"Step-by-step guide to creating and handling mutations using server functions in Next.js.",
			},
			{
				id: "lesson-3-3",
				title: "Best Practices for Server Functions",
				description:
					"Explore best practices for writing efficient and secure server functions in Next.js.",
			},
		],
	},
];
