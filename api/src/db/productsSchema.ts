import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  price: doublePrecision().notNull(),
  image: varchar({ length: 255 }),
});
export const createProductSchema = createInsertSchema(productsTable).omit({
  id: true as never,
});

export const updateProductSchema = createInsertSchema(productsTable)
  .omit({
    id: true as never,
  })
  .partial();
