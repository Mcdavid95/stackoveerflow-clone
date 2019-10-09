import express from 'express';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import messages from './utils/messages';
import configDB from './config/db';
import routes from './routes';
import swaggerDoc from './config/swaggerDoc';
import { handleServerResponse, handleServerResponseError } from './utils/response';

dotenv.config();

const app = express();
const router = express.Router();

const infoLog = debug('http:info');

const url = configDB.url;

connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Pass router to routes
routes(router);

// Pass router to swagger middleware
swaggerDoc(router);

// Allow cross origin access
app.use(helmet())
  .disable('x-powered-by')
  .use(cors());

// Parse application/json
app.use(express.json());

// Parse application/xwww-
app.use(express.urlencoded({ extended: false }));

// Handle base route
app.get('/', (req, res) => handleServerResponse(res, 200, {
  message: messages.welcome,
}));

app.use('/api/v1', router, swaggerUi.serve);
// Handle routes not found
app.use('*', (req, res) => handleServerResponseError(res, 404, messages.notFound));

const server = app.listen(
  process.env.PORT || 3000,
  () => infoLog(`Listening on port ${server.address().port}`)
);

export default server;
