const Joi = require('joi');

const createSchema = Joi.object({
    symbol: Joi.string().regex(/^[A-Z]{3}$/).required(),
    price: Joi.number().required(),
});

const updateSchema = Joi.object({
    price: Joi.number().required(),
});

const buySchema = Joi.object({
    portfolioId: Joi.number().required(),
    quantity: Joi.number().required(),
    symbol: Joi.string().regex(/^[A-Z]{3}$/).required()
});

const sellSchema = Joi.object({
    portfolioId: Joi.number().required(),
    quantity: Joi.number().required(),
    symbol: Joi.string().regex(/^[A-Z]{3}$/).required()
});

module.exports = {
    createSchema,
    updateSchema,
    buySchema,
    sellSchema
}