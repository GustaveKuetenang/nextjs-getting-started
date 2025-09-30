import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			await resend.emails.send({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
				from: "noreply@gustaveckt.com"
			});
		},
	},
	user: {
		additionalFields: {
			lastName: {
				type: 'string',
				required: false,
				defaultValue: "",
				input: true
			},
			username: {
				type: 'string',
				required: true,
				defaultValue: "",
				input: true,
				unique: true
			}
		}
	}
});
