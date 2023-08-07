import type { InferModel } from "drizzle-orm";
import { text, pgTable, integer, decimal } from "drizzle-orm/pg-core";
import { buildIdColumn } from "~db/utils";

export const products = pgTable("products", {
  id: buildIdColumn("PRD"),
  name: text("name").notNull(),
  description: text("description").notNull(),

  price: decimal("price").notNull(),
  quantity: integer("quantity").notNull(),

  image: text("image").notNull(),

  category: text("category").notNull(),
});

export type Product = InferModel<typeof products>; // return type when queried
export type NewProduct = InferModel<typeof products, "insert">; // insert type
