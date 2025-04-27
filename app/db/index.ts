import "dotenv/config";
import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL as string);
export type dbType = NodePgDatabase<Record<string, never>>;
