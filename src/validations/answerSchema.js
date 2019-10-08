import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validNum = JoiValidator.validateNumber().min(1);

export const createSchema = Joi.object({
  answer: JoiValidator.validateString().required(),
  questionId: JoiValidator.validateString().required(),
});

export const getOneAnswerSchema = Joi.object({
  answerId: JoiValidator.validateString().required(),
});

export const getAllAnswersSchema = Joi.object({
  questionId: JoiValidator.validateString().required(),
  page: validNum,
  perPage: validNum
});
