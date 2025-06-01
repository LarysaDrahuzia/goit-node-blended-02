import { ProductsCollection } from '../db/model.products.js';

export const getProducts = async ({ filter = {}, userId }) => {
  const productsQuery = ProductsCollection.find({ userId });

  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }

  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }
  return productsQuery;
};

export const getProductId = async ({ _id, userId }) => {
  const product = await ProductsCollection.findOne({ _id, userId });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async ({ _id, userId }, payload, options = {}) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = async ({ _id, userId }) => {
  const product = await ProductsCollection.findOneAndDelete({ _id, userId });
  return product;
};
