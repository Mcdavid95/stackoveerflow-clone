import Question from '../models/Question';
import DbServices from '../services/dbServices';
import { handleServerResponseError, handleServerError } from '../utils/response';
import messages from '../utils/messages';

const { getById } = DbServices;
const {
  questionNotFound
} = messages;

/**
   * @method checkQuestionId
   * @param {object} req request object
   * @param {object} res request object
   * @param {function} next next function
   * @returns {object} custom response
   * @description checks if questionId passed to params is valid
   */
export const checkQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    if (questionId) {
      const question = await getById(Question, questionId);
      if (!question) {
        return handleServerResponseError(res, 404, { message: questionNotFound });
      }
      return next();
    }
    return next();
  } catch (error) {
    return handleServerError(res, error);
  }
};
