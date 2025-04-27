import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const todo = pgTable("todo", {
	id: uuid("id").primaryKey().defaultRandom(),
	todo: text("todo").notNull(),
	isDone: boolean("is_done").default(false),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export type todoType = typeof todo.$inferInsert;
