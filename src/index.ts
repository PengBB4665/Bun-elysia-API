import { Elysia, t } from "elysia";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";
import {
  ProductPlain,
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../generated/prismabox/Product";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const errorResponseSchema = t.Object({
  message: t.String(),
});

const toProductResponse = (product: {
  id: string;
  name: string;
  detail: string;
  price: { toNumber: () => number } | null;
}) => ({
  id: product.id,
  name: product.name,
  detail: product.detail,
  price: product.price?.toNumber() ?? null,
});

const app = new Elysia()
  .get("/", () => ({ status: "ok" }))
  .post(
    "/products",
    async ({ body }) => {
      const product = await prisma.product.create({ data: body });
      return toProductResponse(product);
    },
    {
      body: ProductPlainInputCreate,
      response: ProductPlain,
    }
  )
  .get(
    "/products",
    async () => {
      const products = await prisma.product.findMany();
      return products.map(toProductResponse);
    },
    {
      response: t.Array(ProductPlain),
    }
  )
  .get(
    "/products/:id",
    async ({ params, set }) => {
      const product = await prisma.product.findUnique({
        where: { id: params.id },
      });

      if (!product) {
        set.status = 404;
        return { message: "Product not found" };
      }

      return toProductResponse(product);
    },
    {
      response: {
        200: ProductPlain,
        404: errorResponseSchema,
      },
    }
  )
  .patch(
    "/products/:id",
    async ({ params, body, set }) => {
      try {
        const product = await prisma.product.update({
          where: { id: params.id },
          data: body,
        });
        return toProductResponse(product);
      } catch {
        set.status = 404;
        return { message: "Product not found" };
      }
    },
    {
      body: ProductPlainInputUpdate,
      response: {
        200: ProductPlain,
        404: errorResponseSchema,
      },
    }
  )
  .delete(
    "/products/:id",
    async ({ params, set }) => {
      try {
        await prisma.product.delete({ where: { id: params.id } });
        return { message: "Product deleted" };
      } catch {
        set.status = 404;
        return { message: "Product not found" };
      }
    },
    {
      response: errorResponseSchema,
    }
  );

export default app;

if (import.meta.main || process.env.NODE_ENV !== "production") {
  app.listen(3000);
  console.log(`Elysia running at http://localhost:3000`);
}
