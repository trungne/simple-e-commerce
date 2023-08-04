import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import { env } from "~/env.mjs";

export const connectionString = `postgres://postgres:${env.DB_PASS}@localhost:${env.DB_PORT}/${env.DB_NAME}`;

export const postgresClient = postgres(connectionString);

export const db: PostgresJsDatabase<typeof schema> = drizzle(postgresClient, {
  schema,
});
