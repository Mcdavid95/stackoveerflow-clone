import answerController from '../../controllers/answerController';
import validate from '../../middlewares/validator';
import { createSchema, getOneAnswerSchema, getAllAnswersSchema } from '../../validations/answerSchema';
import { hasToken } from '../../utils/authHelpers';
import { checkQuestionId } from '../../middlewares/questionMiddleware';
import { checkAnswerId } from '../../middlewares/answerMiddleware';

const {
  create, getOneAnswer, getAllAnswers
} = answerController;

const answerRoute = (router) => {
  router.route('/answers/question/:questionId')

  /**
     * @swagger
     * components:
     *  schemas:
     *    Answer:
     *      properties:
     *        answer:
     *          type: string
     */

  /**
     * @swagger
     * /api/v1/answers/question/{questionId}:
     *   post:
     *     tags:
     *       - Answers
     *     description: Create a new answer to a question
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: questionId
     *         schema:
     *           type: string
     *     requestBody:
     *      description: Answer data object
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/Answer'
     *     responses:
     *       200:
     *         description: List of answers fetched successfully
     *       500:
     *         description: Internal Server error
     *     security:
     *       - bearerAuth: []
     */

    .post(hasToken, validate(createSchema), checkQuestionId, create)

    /**
       * @swagger
       * /api/v1/answers/question/{questionId}:
       *   get:
       *     tags:
       *       - Answers
       *     description: get all questions
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: path
       *         name: questionId
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: Answer created successfully
       *       500:
       *         description: Internal Server error
       */
    .get(validate(getAllAnswersSchema), checkQuestionId, getAllAnswers);

  router.route('/answers/:answerId')
  /**
       * @swagger
       * /api/v1/answers/{answerId}:
       *   get:
       *     tags:
       *       - Answers
       *     description: Get one answer details
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: path
       *         name: answerId
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: Answer details
       *       500:
       *         description: Internal Server error
      */

    .get(validate(getOneAnswerSchema), checkAnswerId, getOneAnswer);
};

export default answerRoute;
