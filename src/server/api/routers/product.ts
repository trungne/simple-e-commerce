import { ilike } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~db/index";
import { products } from "~db/schema";
import type { ProductQuery } from "~interface/product.interface";

const inputValidationSchema: z.ZodType<ProductQuery> = z.object({
  category: z.string().optional(),
});

export const productRouter = createTRPCRouter({
  categoryList: publicProcedure.query(() => {
    return db
      .select({
        name: products.category,
      })
      .from(products)
      .groupBy(products.category);
  }),
  productList: publicProcedure
    .input(inputValidationSchema)
    .query(({ input }) => {
      // TODO: lift this logic to a function
      return db.query.products.findMany({
        where: (products) => {
          if (input.category) {
            return ilike(products.category, input.category);
          }
        },
      });
    }),
});
