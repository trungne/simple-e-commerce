import type { InferModel } from "drizzle-orm";
import { text, pgTable, integer, decimal } from "drizzle-orm/pg-core";
import { buildIdColumn } from "~db/utils";

export const products = pgTable("products", {
  id: buildIdColumn("PRD"),
  name: text("name"),
  description: text("description"),

  price: decimal("price"),
  quantity: integer("quantity"),

  image: text("image"),
  
  category: text("category"),
});

export type Product = InferModel<typeof products>; // return type when queried
export type NewProduct = InferModel<typeof products, "insert">; // insert type
