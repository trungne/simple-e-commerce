import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import "dotenv/config";
import * as schema from "./schema";

export const connectionString = `postgres://postgres:${process.env.DB_PASS}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const postgresClient = postgres(connectionString, {});

type Drizzle = PostgresJsDatabase<typeof schema>;

const customGlobal = globalThis as { db?: Drizzle };
const isProd = process.env.NODE_ENV === "production";

const db: Drizzle =
  customGlobal.db ??
  drizzle(postgresClient, {
    schema,
    logger: true,
  });

if (!isProd) {
  customGlobal.db = db;
}

export { db };
