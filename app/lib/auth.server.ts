import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db";
import { account } from "~/db/schema/account";
import { session } from "~/db/schema/session";
import { user } from "~/db/schema/user";
import { verification } from "~/db/schema/verification";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			account,
			user,
			session,
			verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }) => {
			console.warn("send email reset password not yet implemented");
			console.log("user: ", user);
			console.log("url: ", url);
			console.log("token: ", token);
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, _request) => {
			console.warn("send verification email not yet implemented");
			console.log("user: ", user);
			console.log("url: ", url);
			console.log("token: ", token);
		},
	},
});
