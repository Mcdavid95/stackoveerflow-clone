"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleServerError = exports.handleServerResponseError = exports.handleServerResponse = exports.logger = void 0;

var _bunyan = _interopRequireDefault(require("bunyan"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable camelcase */
_dotenv["default"].config();

var logger = function logger() {
  var log = _bunyan["default"].createLogger({
    name: 'myapp'
  });

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


exports.logger = logger;

var handleServerResponse = function handleServerResponse(response, status, data) {
  return response.status(status).send({
    status: 'success',
    data: data
  });
};
/**
   *
   * @param {*} response response object from server
   * @param {*} status error status
   * @param {*} message error message
   * @returns {*} error response
   */
// eslint-disable-next-line max-len


exports.handleServerResponse = handleServerResponse;

var handleServerResponseError = function handleServerResponseError(response, status, message) {
  logger().error(message);
  return response.status(status).send({
    status: 'error',
    error: message
  });
};

exports.handleServerResponseError = handleServerResponseError;

var handleServerError = function handleServerError(res, error) {
  logger().error(error);
  return res.status(500).send({
    status: 'error',
    error: 'Internal Server Error'
  });
}; // /**
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


exports.handleServerError = handleServerError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9yZXNwb25zZS5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJsb2dnZXIiLCJsb2ciLCJidW55YW4iLCJjcmVhdGVMb2dnZXIiLCJuYW1lIiwiaGFuZGxlU2VydmVyUmVzcG9uc2UiLCJyZXNwb25zZSIsInN0YXR1cyIsImRhdGEiLCJzZW5kIiwiaGFuZGxlU2VydmVyUmVzcG9uc2VFcnJvciIsIm1lc3NhZ2UiLCJlcnJvciIsImhhbmRsZVNlcnZlckVycm9yIiwicmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFKQTtBQU1BQSxtQkFBT0MsTUFBUDs7QUFFTyxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQzFCLE1BQU1DLEdBQUcsR0FBR0MsbUJBQU9DLFlBQVAsQ0FBb0I7QUFBRUMsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FBcEIsQ0FBWjs7QUFDQSxTQUFPSCxHQUFQO0FBQ0QsQ0FITTtBQUtQOzs7Ozs7O0FBT0E7Ozs7O0FBQ08sSUFBTUksb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixDQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBbUJDLElBQW5CO0FBQUEsU0FBNEJGLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQkEsTUFBaEIsRUFBd0JFLElBQXhCLENBQTZCO0FBQzNGRixJQUFBQSxNQUFNLEVBQUUsU0FEbUY7QUFFM0ZDLElBQUFBLElBQUksRUFBSkE7QUFGMkYsR0FBN0IsQ0FBNUI7QUFBQSxDQUE3QjtBQUtQOzs7Ozs7O0FBT0E7Ozs7O0FBQ08sSUFBTUUseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUE0QixDQUFDSixRQUFELEVBQVdDLE1BQVgsRUFBbUJJLE9BQW5CLEVBQStCO0FBQ3RFWCxFQUFBQSxNQUFNLEdBQUdZLEtBQVQsQ0FBZUQsT0FBZjtBQUNBLFNBQU9MLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQkEsTUFBaEIsRUFBd0JFLElBQXhCLENBQTZCO0FBQ2xDRixJQUFBQSxNQUFNLEVBQUUsT0FEMEI7QUFFbENLLElBQUFBLEtBQUssRUFBRUQ7QUFGMkIsR0FBN0IsQ0FBUDtBQUlELENBTk07Ozs7QUFRQSxJQUFNRSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLEdBQUQsRUFBTUYsS0FBTixFQUFnQjtBQUMvQ1osRUFBQUEsTUFBTSxHQUFHWSxLQUFULENBQWVBLEtBQWY7QUFDQSxTQUFPRSxHQUFHLENBQUNQLE1BQUosQ0FBVyxHQUFYLEVBQWdCRSxJQUFoQixDQUFxQjtBQUMxQkYsSUFBQUEsTUFBTSxFQUFFLE9BRGtCO0FBRTFCSyxJQUFBQSxLQUFLLEVBQUU7QUFGbUIsR0FBckIsQ0FBUDtBQUlELENBTk0sQyxDQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBidW55YW4gZnJvbSAnYnVueWFuJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gKCkgPT4ge1xuICBjb25zdCBsb2cgPSBidW55YW4uY3JlYXRlTG9nZ2VyKHsgbmFtZTogJ215YXBwJyB9KTtcbiAgcmV0dXJuIGxvZztcbn07XG5cbi8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlIHJlc3BvbnNlIG9iamVjdCBmcm9tIHNlcnZlclxuICAgKiBAcGFyYW0geyp9IHN0YXR1cyBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBtZXRhLWRhdGFcbiAgICogQHJldHVybnMgeyp9IGVycm9yIHJlc3BvbnNlXG4gICAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBoYW5kbGVTZXJ2ZXJSZXNwb25zZSA9IChyZXNwb25zZSwgc3RhdHVzLCBkYXRhKSA9PiByZXNwb25zZS5zdGF0dXMoc3RhdHVzKS5zZW5kKHtcbiAgc3RhdHVzOiAnc3VjY2VzcycsXG4gIGRhdGFcbn0pO1xuXG4vKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZSByZXNwb25zZSBvYmplY3QgZnJvbSBzZXJ2ZXJcbiAgICogQHBhcmFtIHsqfSBzdGF0dXMgZXJyb3Igc3RhdHVzXG4gICAqIEBwYXJhbSB7Kn0gbWVzc2FnZSBlcnJvciBtZXNzYWdlXG4gICAqIEByZXR1cm5zIHsqfSBlcnJvciByZXNwb25zZVxuICAgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgaGFuZGxlU2VydmVyUmVzcG9uc2VFcnJvciA9IChyZXNwb25zZSwgc3RhdHVzLCBtZXNzYWdlKSA9PiB7XG4gIGxvZ2dlcigpLmVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzKHN0YXR1cykuc2VuZCh7XG4gICAgc3RhdHVzOiAnZXJyb3InLFxuICAgIGVycm9yOiBtZXNzYWdlXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZVNlcnZlckVycm9yID0gKHJlcywgZXJyb3IpID0+IHtcbiAgbG9nZ2VyKCkuZXJyb3IoZXJyb3IpO1xuICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICBlcnJvcjogJ0ludGVybmFsIFNlcnZlciBFcnJvcidcbiAgfSk7XG59O1xuXG4vLyAvKipcbi8vICAqIEBmdW5jdGlvbiBoYXNoUGFzc3dvcmRcbi8vICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBwYXNzd29yZCB0byBiZSBoYXNoZWRcbi8vICAqIEBkZXNjcmlwdGlvbiBoYXNoZXMgYSBwYXNzd29yZCB3aXRoIGJjcnlwdFxuLy8gICogQHJldHVybnMge3N0cmluZ30gcGFzc3dvcmQgaGFzaCBmb3JtXG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcbi8vICAgY29uc3Qgc2FsdFJvdW5kcyA9IHByb2Nlc3MuZW52LlNBTFQ7XG4vLyAgIGNvbnN0IGhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgcGFyc2VJbnQoc2FsdFJvdW5kcywgMTApKTtcbi8vICAgcmV0dXJuIGhhc2g7XG4vLyB9O1xuXG4vLyAvKipcbi8vICAqIEBmdW5jdGlvbiBpc1Bhc3N3b3JkXG4vLyAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgaW4gb3JkaW5hcnkgZm9ybVxuLy8gICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggcGFzc3dvcmQgaGFzaCBmb3JtXG4vLyAgKiBAZGVzY3JpcHRpb24gY2hlY2tzIGlmIGEgcGFzc3dvcmQgY29ycmVzcG9uZHMgd2l0aCBzYXZlZCBoYXNoIGluIGRiXG4vLyAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBjb3JyZWN0IG9mIGZhbHNlIGlmIGluY29ycmVjdFxuLy8gICovXG4vLyBleHBvcnQgY29uc3QgaXNQYXNzd29yZCA9IChwYXNzd29yZCwgaGFzaCkgPT4gYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCBoYXNoKTtcblxuLy8gLyoqXG4vLyAgKiBjcmVhdGVUb2tlblxuLy8gICogQHBhcmFtIHtOdW1iZXJ9IGlkIHVzZXIgaWQgZ290dGVuIGZyb20gREFUQUJBU0VfVVJMXG4vLyAgKiBAcGFyYW0ge051bWJlcn0gaXNBZG1pbiB2YWx1ZSBvZiBpZiB1c2VyIGlzIGFuIGFkbWluXG4vLyAgKiBAZGVzY3JpcHRpb24gY3JlYXRlcyBuZXcgand0IHRva2VuIGZvciBhdXRoZW50aWNhdGlvblxuLy8gICogQHJldHVybnMge1N0cmluZ30gbmV3bHkgY3JlYXRlZCBqd3Rcbi8vICAqL1xuLy8gZXhwb3J0IGNvbnN0IGNyZWF0ZVRva2VuID0gKGlkKSA9PiB7XG4vLyAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXG4vLyAgICAge1xuLy8gICAgICAgaWRcbi8vICAgICB9LFxuLy8gICAgIHByb2Nlc3MuZW52LlNFQ1JFVCwgeyBleHBpcmVzSW46ICc3ZCcgfVxuLy8gICApO1xuLy8gICByZXR1cm4gdG9rZW47XG4vLyB9O1xuXG4vLyAvKipcbi8vICAqIEBtZXRob2QgaGFzVG9rZW5cbi8vICAqIEBwYXJhbSB7Kn0gcmVxXG4vLyAgKiBAcGFyYW0geyp9IHJlc1xuLy8gICogQHBhcmFtIHsqfSBuZXh0XG4vLyAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXNwb25zZSBvYmplY3Rcbi8vICAqL1xuLy8gZXhwb3J0IGNvbnN0IGhhc1Rva2VuID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4vLyAgIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gfHwgcmVxLmhlYWRlcnMuQXV0aG9yaXphdGlvbjtcbi8vICAgdHJ5IHtcbi8vICAgICBpZiAodG9rZW4pIHtcbi8vICAgICAgIGNvbnN0IGRlY29kZWQgPSBhd2FpdCBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5TRUNSRVQpO1xuLy8gICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeUlkKGRlY29kZWQuaWQpO1xuLy8gICAgICAgaWYgKCF1c2VyKSB7XG4vLyAgICAgICAgIHJldHVybiBoYW5kbGVTZXJ2ZXJSZXNwb25zZUVycm9yKHJlcywgNDAzLCAnVG9rZW4geW91IHByb3ZpZGVkIGlzIGludmFsaWQnKTtcbi8vICAgICAgIH1cbi8vICAgICAgIHJlcS5kZWNvZGVkID0gZGVjb2RlZDtcbi8vICAgICAgIHJldHVybiBuZXh0KCk7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBoYW5kbGVTZXJ2ZXJSZXNwb25zZUVycm9yKHJlcywgNDAzLCAnWW91IGhhdmUgdG8gYmUgbG9nZ2VkIGluJyk7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgcmV0dXJuIGhhbmRsZVNlcnZlclJlc3BvbnNlRXJyb3IocmVzLCA0MDMsIGVycm9yKTtcbi8vICAgfVxuLy8gfTtcbiJdfQ==