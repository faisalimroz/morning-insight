const Joi = require('joi');
const AppError = require('../utils/AppError');

const countrySchema = Joi.string().trim().valid('Global', 'Bangladesh').default('Bangladesh');

const createContentSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow('', null),
  content: Joi.string().trim().required(),
  date: Joi.date().iso().optional(),
  source: Joi.string().trim().allow('', null),
  category: Joi.string().trim().required(),
  insightCategory: Joi.string().trim().required(),
  keywords: Joi.array().items(Joi.string().trim()).optional(),
  image: Joi.string().trim().allow('', null),
  author: Joi.string().trim().allow('', null),
  country: countrySchema,
});

const updateContentSchema = createContentSchema.fork(
  ['title', 'content', 'category', 'insightCategory'],
  (schema) => schema.optional(),
);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  country: Joi.string().trim(),
  category: Joi.string().trim(),
  insightCategory: Joi.string().trim(),
  source: Joi.string().trim(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  dateFrom: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  dateTo: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  search: Joi.string().trim().allow(''),
});

const validate = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    const message = error.details.map((d) => d.message).join(', ');
    throw new AppError(message, 400);
  }

  return value;
};

module.exports = {
  createContentSchema,
  updateContentSchema,
  listQuerySchema,
  validate,
};
