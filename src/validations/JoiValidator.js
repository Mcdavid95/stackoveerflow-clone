import Joi from '@hapi/joi';


/** *
 *  Object that help to validate request details
 */
const JoiValidation = {

  validateString() {
    return Joi.string();
  },

  validateAlphabet() {
    return Joi.string().regex(/^[a-zA-Z ]+$/);
  },

  validateEmail() {
    return Joi.string().email();
  },

  validatePassword() {
    return Joi.string().min(8).strict()
      .required();
  },

  /**
   * date schema creator
   * @returns {Object} - date schema
  */
  validateDate() {
    return Joi.date();
  },

  /**
   * number schema creator
   * @returns {Object} - number schema
  */
  validateNumber() {
    return Joi.number();
  },

  /**
   * object schema creator
   * @returns {Object} - object schema
  */
  validArray() {
    return Joi.array();
  },

  /**
   * object schema creator
   * @returns {Object} - object schema
  */
  validateBoolean() {
    return Joi.boolean();
  },

  /**
   * Object schema creator
   * @param {endDate} endDate -string
   * @returns {object} - object schema
   */
  compareDate(endDate) {
    return Joi.date().when(endDate, {
      is: Joi.required(),
      then: Joi.date().less(Joi.ref(endDate)),
    });
  }
};

export default JoiValidation;
