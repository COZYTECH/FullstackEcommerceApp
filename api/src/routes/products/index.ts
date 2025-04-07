import { Router } from "express";
import {
  listProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";

import { validateData } from "../../middlewares/validationMiddleware";
import { z } from "zod";
import { productsTable } from "../../db/productsSchema";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

//const createProductSchema = z.object({
//  name: z.string(),
//price: z.number(),
//});
//export const createProductSchema = createInsertSchema(productsTable).omit({
//  id: true as never,
//});
//type productType = z.infer<typeof createProductSchema>;

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductsById);
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
