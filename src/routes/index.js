import authRoute from './api/authRoute';
import { handleServerResponse } from '../utils/response';
import messages from '../utils/messages';

const routes = (router) => {
  router
    .route('/')
    /**
     * @swagger
     * /api/v1:
     *   get:
     *     tags:
     *      - name: Welcome Message Endpoint
     *     summary: Welcome message endpoint
     *     description: Endpoint returns welcome message
     *     responses:
     *      200:
     *        description: Successful operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/welcomeResponse'
     * components:
     *   schemas:
     *     welcomeResponse:
     *       type: object
     *       properties:
     *         status:
     *           type: string
     *         data:
     *           type: object
     *           properties:
     *             message:
     *               type: string
     */
    .get((req, res) => handleServerResponse(res, 200, {
      message: messages.apiV1Welcome,
    }));

  // auth routes
  authRoute(router);
};

export default routes;
