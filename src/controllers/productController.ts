// src/controllers/productController.ts
import { Request, Response, NextFunction } from "express";
import Product from "../models/productModel";
import { ValidationError, DatabaseError } from "../utils/customErrors";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      throw new ValidationError("Name and price are required fields");
    }

    const product = new Product({ name, price, description });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    next(error); // Passes the error to the error handler middleware
  }
};

// Get All Products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(new DatabaseError("Failed to retrieve products"));
  }
};

// Get Product by ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ValidationError("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error); // If the error is related to database (e.g. invalid ID format), it will be caught
  }
};

// Update Product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new ValidationError("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(new DatabaseError("Failed to update product"));
  }
};

// Delete Product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new ValidationError("Product not found");
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(new DatabaseError("Failed to delete product"));
  }
};
