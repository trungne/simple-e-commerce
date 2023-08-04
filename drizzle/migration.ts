import { migrate } from "drizzle-orm/postgres-js/migrator";
import "dotenv/config";
import { db } from "./index";

migrate(db, { migrationsFolder: "./drizzle/migrations" })
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error running migrations", err);
    process.exit(1);
  });
