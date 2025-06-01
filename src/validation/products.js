import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  price: Joi.number().min(0).precision(2).required(),
  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .required(),
  description: Joi.string(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  price: Joi.number().min(0).precision(2),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
});
