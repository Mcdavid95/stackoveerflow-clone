import mongoose from 'mongoose';
import dbServices from '../services/dbServices';
import Question from '../models/Question';
import User from '../models/User';
import Answer from '../models/Answer';
import {
  handleServerError, handleServerResponse
} from '../utils/response';

const {
  getAll
} = dbServices;

mongoose.Promise = global.Promise;

const searchController = {
  /**
   * @method search
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response object
   * @description searches accross the collections for searchTerm
   */
  async search(req, res) {
    const {
      body: { searchTerm }
    } = req;
    try {
      const questions = await getAll(Question, { $text: { $search: searchTerm } });
      const users = await getAll(User, { $text: { $search: searchTerm } });
      const answers = await getAll(Answer, { $text: { $search: searchTerm } });
      const count = questions.length + users.length + answers.length;
      return handleServerResponse(res, 200, {
        questions, users, answers, count
      });
    } catch (error) {
      return handleServerError(res, error);
    }
  }
};
export default searchController;
