/* eslint-disable camelcase */
import bunyan from 'bunyan';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const logger = () => {
  const log = bunyan.createLogger({ name: 'myapp' });
  return log;
};

/**
   *
   * @param {*} response response object from server
   * @param {*} status error message
   * @param {*} data meta-data
   * @returns {*} error response
   */
// eslint-disable-next-line max-len
export const handleServerResponse = (response, status, data) => response.status(status).send({
  status: 'success',
  data
});

/**
   *
   * @param {*} response response object from server
   * @param {*} status error status
   * @param {*} message error message
   * @returns {*} error response
   */
// eslint-disable-next-line max-len
export const handleServerResponseError = (response, status, message) => {
  logger().error(message);
  return response.status(status).send({
    status: 'error',
    error: message
  });
};

export const handleServerError = (res, error) => {
  logger().error(error);
  return res.status(500).send({
    status: 'error',
    error: 'Internal Server Error'
  });
};

// /**
//  * @function hashPassword
//  * @param {string} password password to be hashed
//  * @description hashes a password with bcrypt
//  * @returns {string} password hash form
//  */
// export const hashPassword = async (password) => {
//   const saltRounds = process.env.SALT;
//   const hash = await bcrypt.hash(password, parseInt(saltRounds, 10));
//   return hash;
// };

// /**
//  * @function isPassword
//  * @param {string} password in ordinary form
//  * @param {string} hash password hash form
//  * @description checks if a password corresponds with saved hash in db
//  * @returns {boolean} true if correct of false if incorrect
//  */
// export const isPassword = (password, hash) => bcrypt.compareSync(password, hash);

// /**
//  * createToken
//  * @param {Number} id user id gotten from DATABASE_URL
//  * @param {Number} isAdmin value of if user is an admin
//  * @description creates new jwt token for authentication
//  * @returns {String} newly created jwt
//  */
// export const createToken = (id) => {
//   const token = jwt.sign(
//     {
//       id
//     },
//     process.env.SECRET, { expiresIn: '7d' }
//   );
//   return token;
// };

// /**
//  * @method hasToken
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  * @returns {Object} response object
//  */
// export const hasToken = async (req, res, next) => {
//   const token = req.headers['x-access-token'] || req.headers.Authorization;
//   try {
//     if (token) {
//       const decoded = await jwt.verify(token, process.env.SECRET);
//       const user = await UserService.getUserById(decoded.id);
//       if (!user) {
//         return handleServerResponseError(res, 403, 'Token you provided is invalid');
//       }
//       req.decoded = decoded;
//       return next();
//     }
//     return handleServerResponseError(res, 403, 'You have to be logged in');
//   } catch (error) {
//     return handleServerResponseError(res, 403, error);
//   }
// };
