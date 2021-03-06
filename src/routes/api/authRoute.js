import authController from '../../controllers/authController';
import validate from '../../middlewares/validator';
import { signUpSchema, signInSchema } from '../../validations/authSchema';

const { signup, signin } = authController;

const authRoute = (router) => {
  router.route('/auth/signup')

  /**
     * @swagger
     * components:
     *  schemas:
     *    User:
     *      properties:
     *        email:
     *          type: string
     *        password:
     *          type: string
     *        firstName:
     *          type: string
     *        lastName:
     *         type: string
     */

  /**
     * @swagger
     * /api/v1/auth/signup:
     *   post:
     *     tags:
     *       - Users
     *     description: Create a new user account
     *     produces:
     *       - application/json
     *     requestBody:
     *      description: User data object
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: User created successfully
     *       500:
     *         description: Internal Server error
     */

    .post(validate(signUpSchema), signup);

  router.route('/auth/signin')

  /**
       * @swagger
       * components:
       *  schemas:
       *    SignIn:
       *      properties:
       *        email:
       *          type: string
       *          example: mc@gmail.com
       *        password:
       *          type: string
       *          example: jabike_13
       */

  /**
       * @swagger
       * /api/v1/auth/signin:
       *   post:
       *     tags:
       *       - Users
       *     description: Authenticate a user with email and password
       *     produces:
       *       - application/json
       *     requestBody:
       *      description: User data object
       *      required: true
       *      content:
       *       application/json:
       *          schema:
       *            $ref: '#/components/schemas/SignIn'
       *     responses:
       *       200:
       *         description: Authenticated user and generated a token
       *       500:
       *         description: Internal Server error
      */

    .post(validate(signInSchema), signin);
};

export default authRoute;
