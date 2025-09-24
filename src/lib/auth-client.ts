import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields({
			user: {
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
		})
	]
});

export const
	{
		useSession,
		signIn,
		signOut,
		signUp
	} = authClient;
