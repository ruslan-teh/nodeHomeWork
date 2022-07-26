import * as Joi from 'joi';

export const commonValidator = {
    emailValidator: Joi.string().regex(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/),
};
