import mongoose from 'mongoose';
import dbServices from '../services/dbServices';
import User from '../models/User';
import {
  handleServerError, handleServerResponse, handleServerResponseError
} from '../utils/response';
import {
  createToken, isPassword
} from '../utils/authHelpers';

const { create, getByOptions } = dbServices;

mongoose.Promise = global.Promise;

const authController = {
  async signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    try {
      const isEmail = await getByOptions(User, {
        email: email.trim().toLowerCase()
      });
      if (isEmail) {
        return handleServerResponseError(res, 409, 'Email already exists');
      }
      const newUser = create(User, {
        firstName: firstName.trim().toLowerCase(),
        lastName: lastName.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password
      });
      const user = await newUser.save();
      const token = createToken(user.id);
      return handleServerResponse(res, 201, { user, token });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await getByOptions(User, {
        email: email.trim().toLowerCase()
      });
      if (user) {
        if (!isPassword(password, user.password)) {
          return handleServerResponseError(res, 403, 'Password/Email incorrect');
        }
        const token = createToken(user.id);
        return handleServerResponse(res, 200, { message: 'User logged in successfully', token });
      }
      return handleServerResponseError(res, 403, 'Password/Email incorrect');
    } catch (error) {
      return handleServerError(res, error);
    }
  }
};
export default authController;
