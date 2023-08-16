import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import "dotenv/config";
import * as schema from "./schema";

export const connectionString = `postgres://postgres:${process.env.DB_PASS}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const postgresClient = postgres(connectionString);

export const db: PostgresJsDatabase<typeof schema> = drizzle(postgresClient, {
  schema,
});
