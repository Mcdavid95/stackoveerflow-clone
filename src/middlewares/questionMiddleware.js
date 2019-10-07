import Question from '../models/Question';
import DbServices from '../services/dbServices';
import response from '../utils/response';
import messages from '../utils/messages';

const { getById } = DbServices;
const {
  questionNotFound, serverError
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
      const user = await getById(Question, questionId);
      if (!user) {
        return response(res, 404, 'error', { message: questionNotFound });
      }
      return next();
    }
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: serverError });
  }
};
