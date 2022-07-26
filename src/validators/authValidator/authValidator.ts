import Joi from 'joi';
import { commonValidator } from '../commonValidator/commonValidator';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('email not valid').trim(),
        password: Joi.string().required().min(8).max(12)
            .message('password not valid')
            .trim(),
    }),
};
