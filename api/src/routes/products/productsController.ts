import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import { PgSparseVectorBuilder } from "drizzle-orm/pg-core";

export async function listProducts(req: Request, res: Response) {
  try {
    const listProducts = await db.select().from(productsTable);
    res.status(200).json(listProducts);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductsById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const updatedFields = req.body;
    // Check if the request body is empty
    const id = Number(req.params.id);
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    // Check if the product was found and deleted
    // If not, it means the product with the given ID does not exist
    if (deletedProduct) {
      res.status(204).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
