import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  getProductsController,
  getProductIdController,
  createProductController,
  patchProductController,
  deleteProductController,
} from '../controllers/products.js';
import { createProductSchema } from '../validation/products.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductIdController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  validateBody(createProductSchema),
  isValidId,
  ctrlWrapper(patchProductController),
);

router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
