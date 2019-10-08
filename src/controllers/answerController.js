import mongoose from 'mongoose';
import dbServices from '../services/dbServices';
import Answer from '../models/Answer';
import {
  handleServerError, handleServerResponse
} from '../utils/response';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';

const {
  create, getById, getAll, countAllRecordWithOptions
} = dbServices;

mongoose.Promise = global.Promise;

const answerController = {
  /**
   * @method create
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description creates a new answer to the question whose id is passed to params as questionId
   */
  async create(req, res) {
    const {
      body: { answer }, decoded: { id }, params: { questionId }
    } = req;
    try {
      const newAnswer = await create(Answer, { answer, owner: id, question: questionId });
      const savedAnswer = await newAnswer.save();
      return handleServerResponse(res, 201, { answer: savedAnswer });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   * @method getOneAnswer
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description gets one answer with the id supplied to the params
   */
  async getOneAnswer(req, res) {
    const {
      params: { answerId }
    } = req;
    try {
      const answer = await getById(Answer, answerId);
      return handleServerResponse(res, 200, { answer });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   * @method getAllAnswers
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description gets all answers for the question whose Id is supplied through answerId
   */
  async getAllAnswers(req, res) {
    const {
      query: { page, perPage }, params: { questionId }
    } = req;
    try {
      const answerCount = await countAllRecordWithOptions(Answer, { question: questionId });
      const { limit, offset } = calculateLimitAndOffset(page, perPage);
      const answers = await getAll(Answer, { question: questionId })
        .limit(limit)
        .skip(offset);
      const meta = paginate(page, perPage, answerCount, answers);
      return handleServerResponse(res, 200, { answers, meta });
    } catch (error) {
      return handleServerError(res, error);
    }
  }
};

export default answerController;
