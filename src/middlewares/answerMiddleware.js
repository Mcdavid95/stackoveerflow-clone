import Answer from '../models/Answer';
import DbServices from '../services/dbServices';
import { handleServerResponseError, handleServerError } from '../utils/response';
import messages from '../utils/messages';

const { getById } = DbServices;
const {
  answerNotFound
} = messages;

/**
   * @method checkAnswerId
   * @param {object} req request object
   * @param {object} res request object
   * @param {function} next next function
   * @returns {object} custom response
   * @description checks if answerId passed to params is valid
   */
export const checkAnswerId = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    if (answerId) {
      const answer = await getById(Answer, answerId);
      if (!answer) {
        return handleServerResponseError(res, 404, answerNotFound);
      }
      return next();
    }
    return next();
  } catch (error) {
    return handleServerError(res, error);
  }
};
