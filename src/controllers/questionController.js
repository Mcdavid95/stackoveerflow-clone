import mongoose from 'mongoose';
import dbServices from '../services/dbServices';
import Question from '../models/Question';
import Vote from '../models/Vote';
import {
  handleServerError, handleServerResponse
} from '../utils/response';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';

const {
  create, getById, getAll, countAllRecord, update
} = dbServices;

mongoose.Promise = global.Promise;

const questionController = {
  /**
   * @method create
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description creates a new question for the logged in user
   */
  async create(req, res) {
    const {
      body: { question }, decoded: { id }
    } = req;
    try {
      const newQuestion = await create(Question, { question, owner: id });
      const savedQuestion = await newQuestion.save();
      return handleServerResponse(res, 201, { question: savedQuestion });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   * @method getOneQuestion
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description gets one question with the id supplied to the params
   */
  async getOneQuestion(req, res) {
    const {
      params: { questionId }
    } = req;
    try {
      const question = await getById(Question, questionId);
      return handleServerResponse(res, 200, { question });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   * @method getOneQuestion
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description gets one question with the id supplied to the params
   */
  async getAllQuestions(req, res) {
    const {
      query: { page, perPage }
    } = req;
    try {
      const questionCount = await countAllRecord(Question);
      const { limit, offset } = calculateLimitAndOffset(page, perPage);
      const questions = await getAll(Question, {})
        .limit(limit)
        .skip(offset);
      const meta = paginate(page, perPage, questionCount, questions);
      return handleServerResponse(res, 200, { questions, meta });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  async upvoteQuestion(req, res) {
    const { decoded: { id }, params: { questionId } } = req;
    try {
      const vote = await update(Vote, { owner: id, question: questionId }, { vote: 'upvote' }, { new: true, upsert: true });
      return handleServerResponse(res, 200, { vote });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  async downvoteQuestion(req, res) {
    const { decoded: { id }, params: { questionId } } = req;
    try {
      const vote = await update(Vote, { owner: id, question: questionId }, { vote: 'downvote' }, { new: true, upsert: true });
      return handleServerResponse(res, 200, { vote });
    } catch (error) {
      return handleServerError(res, error);
    }
  }
};

export default questionController;
