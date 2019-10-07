import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validNum = JoiValidator.validateNumber().min(1);

export const createSchema = Joi.object({
  question: JoiValidator.validateString().required()
});

export const getOneQuestionSchema = Joi.object({
  questionId: JoiValidator.validateString().required(),
});

export const getAllQuestionsSchema = Joi.object({
  page: validNum,
  perPage: validNum
});
