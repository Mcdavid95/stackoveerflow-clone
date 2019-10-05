import { handleServerResponseError } from '../utils/response';

export default (schema) => async (req, res, next) => {
  try {
    if (!schema) return next();

    const { body, params, query } = req;

    await schema.validateAsync({ ...body, ...params, ...query }, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });
    return next();
  } catch (err) {
    const errors = {};
    err.details.forEach((e) => {
      errors[e.message.split(' ', 1)[0].replace(/['"]/g, '')] = e.message.replace(/['"]/g, '');
    });
    return handleServerResponseError(res, 400, errors);
  }
};
