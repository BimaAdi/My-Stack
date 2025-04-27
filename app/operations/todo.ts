import { and, desc, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type { dbType } from "~/db";
import { todo, type todoType } from "~/db/schema/todo";

export const getAllTodo = async ({
	db,
	userId,
}: { db: dbType; userId?: string }) => {
	const andQuery = [];
	if (userId) {
		andQuery.push(eq(todo.userId, userId));
	}
	return await db
		.select()
		.from(todo)
		.where(and(...andQuery))
		.orderBy(desc(todo.updatedAt));
};

export const createTodo = async ({
	db,
	todoName,
	isDone,
	userId,
}: { db: dbType; todoName: string; isDone: boolean; userId: string }) => {
	const now = new Date();
	const id = uuidv4();
	const newTodo: todoType = {
		id,
		todo: todoName,
		isDone,
		userId,
		createdAt: now,
		updatedAt: now,
	};
	await db.insert(todo).values(newTodo);
	return newTodo;
};

export const toggelTodo = async ({ db, id }: { db: dbType; id: string }) => {
	const datas = await db.select().from(todo).where(eq(todo.id, id));
	if (datas.length > 0) {
		const data = datas[0];
		await db
			.update(todo)
			.set({
				isDone: !data.isDone,
			})
			.where(eq(todo.id, data.id));
	}
};

export const deleteTodo = async ({ db, id }: { db: dbType; id: string }) => {
	await db.delete(todo).where(eq(todo.id, id));
};
