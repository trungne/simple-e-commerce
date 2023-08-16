import { and, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~db/index";
import { products } from "~db/schema";
import type { Product } from "~db/schema";

const DEFAULT_PAGE = 0;
const DEFAULT_PER_PAGE = 12;

const inputValidationSchema = z
  .object({
    name: z.string().optional(),
    category: z.string().optional(),
    page: z.number().optional(),
    perPage: z.number().optional(),
  })
  .transform((input) => {
    return {
      ...input,
      page: input.page ?? DEFAULT_PAGE,
      perPage: input.perPage ?? DEFAULT_PER_PAGE,
    };
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
  productList: publicProcedure.input(inputValidationSchema).query<{
    totalPage: number;
    perPage: number;
    data: Product[];
  }>(async ({ input }) => {
    // TODO: lift this logic to a function

    const condition = and(
      input.category ? ilike(products.category, input.category) : undefined,
      input.name ? ilike(products.name, `%${input.name}%`) : undefined
    );

    const [countResult] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(products)
      .where(condition);

    const productList = await db.query.products.findMany({
      limit: input.perPage,
      offset: input.page * input.perPage,
      where: condition,
    });

    const totalPage = Math.ceil((countResult?.count ?? 0) / input.perPage);

    return {
      totalPage,
      perPage: input.perPage,
      data: productList,
    };
  }),
});
