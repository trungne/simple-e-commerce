import { sql } from "drizzle-orm";
import { db } from "..";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "~db/schema";

async function emptyDBTables(db: PostgresJsDatabase<typeof schema>) {
  console.log("🗑️ Emptying the entire database");

  const tablesSchema = db._.schema;
  if (!tablesSchema) throw new Error("Schema not loaded");

  const queries = Object.values(tablesSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`DELETE FROM ${table.dbName};`);
  });

  console.log("🛜 Sending delete queries");

  await db.transaction(async (trx) => {
    await Promise.all(
      queries.map(async (query) => {
        if (query) await trx.execute(query);
      })
    );
  });

  console.log("✅ Database emptied");
}

emptyDBTables(db)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error emptying database", err);
    process.exit(1);
  });
