import questionController from '../../controllers/questionController';
import validate from '../../middlewares/validator';
import { createSchema, getOneQuestionSchema, getAllQuestionsSchema } from '../../validations/questionSchema';
import { hasToken } from '../../utils/authHelpers';
import { checkQuestionId } from '../../middlewares/questionMiddleware';

const {
  create, getOneQuestion, getAllQuestions, upvoteQuestion, downvoteQuestion
} = questionController;

const questionRoute = (router) => {
  router.route('/questions')

  /**
     * @swagger
     * components:
     *  schemas:
     *    Question:
     *      properties:
     *        question:
     *          type: string
     */

  /**
     * @swagger
     * /api/v1/questions:
     *   post:
     *     tags:
     *       - Questions
     *     description: Create a new question
     *     produces:
     *       - application/json
     *     requestBody:
     *      description: Question data object
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/Question'
     *     responses:
     *       200:
     *         description: Question created successfully
     *       500:
     *         description: Internal Server error
     *     security:
     *       - bearerAuth: []
     */

    .post(hasToken, validate(createSchema), create)

    /**
       * @swagger
       * /api/v1/questions:
       *   get:
       *     tags:
       *       - Questions
       *     description: get all questions
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Question created successfully
       *       500:
       *         description: Internal Server error
       */
    .get(validate(getAllQuestionsSchema), getAllQuestions);

  router.route('/questions/:questionId')
  /**
       * @swagger
       * /api/v1/questions/{questionId}:
       *   get:
       *     tags:
       *       - Questions
       *     description: Get one question details
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: path
       *         name: questionId
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: Question details
       *       500:
       *         description: Internal Server error
      */

    .get(validate(getOneQuestionSchema), checkQuestionId, getOneQuestion);

  router.route('/questions/:questionId/upvote')
  /**
         * @swagger
         * /api/v1/questions/{questionId}/upvote:
         *   patch:
         *     tags:
         *       - Questions
         *     description: upvote a question
         *     produces:
         *       - application/json
         *     parameters:
         *       - in: path
         *         name: questionId
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Vote details
         *       500:
         *         description: Internal Server error
         *     security:
         *       - bearerAuth: []
        */

    .patch(hasToken, validate(getOneQuestionSchema), checkQuestionId, upvoteQuestion);

  router.route('/questions/:questionId/downvote')
  /**
           * @swagger
           * /api/v1/questions/{questionId}/downvote:
           *   patch:
           *     tags:
           *       - Questions
           *     description: downvote a question
           *     produces:
           *       - application/json
           *     parameters:
           *       - in: path
           *         name: questionId
           *         schema:
           *           type: string
           *     responses:
           *       200:
           *         description: Vote details
           *       500:
           *         description: Internal Server error
           *     security:
           *       - bearerAuth: []
          */

    .patch(hasToken, validate(getOneQuestionSchema), checkQuestionId, downvoteQuestion);
};

export default questionRoute;
