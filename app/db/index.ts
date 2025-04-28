import "dotenv/config";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle({ client: queryClient });
export type dbType = PostgresJsDatabase<Record<string, never>>;
