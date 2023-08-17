import { TRPCError } from "@trpc/server";
import { and, eq, ilike, sql } from "drizzle-orm";
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
  .optional()
  .transform((input) => {
    return {
      ...input,
      page: input?.page ?? DEFAULT_PAGE,
      perPage: input?.perPage ?? DEFAULT_PER_PAGE,
    };
  });

const createInputValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  quantity: z.number(),
  image: z.string(),
  category: z.string(),
});
const HasID = z.object({ id: z.string() });

const updateInputValidationSchema = createInputValidationSchema
  .partial()
  .merge(HasID);

export const productRouter = createTRPCRouter({
  categoryList: publicProcedure.query(() => {
    return db
      .select({
        name: products.category,
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(products)
      .groupBy(products.category)
      .orderBy(products.category);
  }),
  productList: publicProcedure.input(inputValidationSchema).query<{
    totalPage: number;
    perPage: number;
    data: Product[];
  }>(async ({ input }) => {
    // TODO: lift this logic to a function

    const condition = and(
      input?.category ? ilike(products.category, input.category) : undefined,
      input?.name ? ilike(products.name, `%${input.name}%`) : undefined
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
      orderBy: products.name,
    });

    const totalPage = Math.ceil((countResult?.count ?? 0) / input.perPage);

    return {
      totalPage,
      perPage: input.perPage,
      data: productList,
    };
  }),

  productDetail: publicProcedure
    .input(HasID)
    .query<Product>(async ({ input }) => {
      const product = await db.query.products.findFirst({
        where: eq(products.id, input.id),
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return product;
    }),
  createProduct: publicProcedure
    .input(createInputValidationSchema)
    .mutation(async ({ input }) => {
      await db.insert(products).values({
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        image: input.image,
        category: input.category,
      });
    }),

  updateProduct: publicProcedure
    .input(updateInputValidationSchema)
    .mutation(async ({ input }) => {
      await db
        .update(products)
        .set({
          name: input.name,
          description: input.description,
          price: input.price,
          quantity: input.quantity,
          image: input.image,
          category: input.category,
        })
        .where(eq(products.id, input.id));
    }),

  deleteProduct: publicProcedure.input(HasID).mutation(async ({ input }) => {
    await db.delete(products).where(eq(products.id, input.id));
  }),
});
