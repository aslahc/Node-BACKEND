import Product from "../models/productModel";

export const createProduct = async (productData: any) => {
  return await Product.create(productData);
};

export const getProducts = async () => {
  return await Product.find();
};

// Additional CRUD operations for updating and deleting
