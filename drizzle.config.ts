import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./drizzle/schema/index.ts",
  out: "./drizzle/migrations",
} satisfies Config;
