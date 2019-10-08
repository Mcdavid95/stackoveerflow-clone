import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

export const searchSchema = Joi.object({
  searchTerm: JoiValidator.validateString().required(),
});
