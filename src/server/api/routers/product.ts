import { ilike } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~db/index";
import type { ProductQuery } from "~interface/product.interface";

const inputValidationSchema: z.ZodType<ProductQuery> = z.object({
  category: z.string().optional(),
});

export const productRouter = createTRPCRouter({
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
