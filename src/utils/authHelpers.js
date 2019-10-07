/* eslint-disable import/no-cycle */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DbServices from '../services/dbServices';
import User from '../models/User';
import messages from './messages';
import { handleServerResponseError } from './response';

dotenv.config();

const { getById } = DbServices;
const {
  unauthenticated, invalidToken
} = messages;

/**
 * @function hashPassword
 * @param {string} password password to be hashed
 * @description hashes a password with bcrypt
 * @returns {string} password hash form
 */
export const hashPassword = async (password) => {
  const saltRounds = process.env.SALT;
  const hash = await bcrypt.hash(password, parseInt(saltRounds, 10));
  return hash;
};

/**
 * @function isPassword
 * @param {string} password in ordinary form
 * @param {string} hash password hash form
 * @description checks if a password corresponds with saved hash in db
 * @returns {boolean} true if correct of false if incorrect
 */
export const isPassword = (password, hash) => bcrypt.compareSync(password, hash);

/**
 * createToken
 * @param {Number} id user id gotten from DATABASE_URL
 * @param {Number} isAdmin value of if user is an admin
 * @description creates new jwt token for authentication
 * @returns {String} newly created jwt
 */
export const createToken = (id) => {
  const token = jwt.sign(
    {
      id
    },
    process.env.SECRET, { expiresIn: '7d' }
  );
  return token;
};

/**
 * @method hasToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */
export const hasToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.Authorization || req.headers.authorization;
  try {
    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        const [, jwtToken] = token.split(' ');
        token = jwtToken;
      }
      const decoded = await jwt.verify(token, process.env.SECRET);
      const user = await getById(User, decoded.id);
      if (!user) {
        return handleServerResponseError(res, 403, invalidToken);
      }
      req.decoded = decoded;
      return next();
    }
    return handleServerResponseError(res, 403, unauthenticated);
  } catch (error) {
    return handleServerResponseError(res, 403, error);
  }
};
