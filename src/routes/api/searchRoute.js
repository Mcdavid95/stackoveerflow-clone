import searchController from '../../controllers/searchController';
import validate from '../../middlewares/validator';
import { searchSchema } from '../../validations/searchSchema';

const {
  search
} = searchController;

const searchRoute = (router) => {
  router.route('/search')

  /**
     * @swagger
     * components:
     *  schemas:
     *    Search:
     *      properties:
     *        searchTerm:
     *          type: string
     */

  /**
     * @swagger
     * /api/v1/search:
     *   post:
     *     tags:
     *       - Search
     *     description: searches across all collections
     *     produces:
     *       - application/json
     *     requestBody:
     *      description: search data object
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/Search'
     *     responses:
     *       200:
     *         description: List of results fetched successfully
     *       500:
     *         description: Internal Server error
     */

    .post(validate(searchSchema), search);
};

export default searchRoute;
