import { eq } from "drizzle-orm";
import { db } from "~/db";
import { user } from "~/db/schema/user";

export const verifyEmail = async ({ email }: { email: string }) => {
	const user_data = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.limit(1);
	if (user_data.length === 0) {
		console.warn(`user with email ${email} not found`);
		return false;
	}
	await db
		.update(user)
		.set({ emailVerified: true })
		.where(eq(user.email, email));
	return true;
};
