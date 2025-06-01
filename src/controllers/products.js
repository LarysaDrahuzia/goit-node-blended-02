import createHttpError from 'http-errors';
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res, next) => {
  const filter = parseFilterParams(req.query);

  const products = await getProducts({ filter, userId: req.user._id });
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductId({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: `Successfully found product with id: ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { productId } = req.params;
  const result = await updateProduct(
    {
      _id: productId,
      userId: req.user._id,
    },
    req.body,
  );

  if (!result) {
    return next(createHttpError(404, 'Product not found!'));
  }
  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result.product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProduct({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    return next(createHttpError(404, 'Product not found!'));
  }
  res.status(204).send();
};
