import express from 'express';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import messages from './utils/messages';
import { handleServerResponse } from './utils/response';

const app = express();

const infoLog = debug('http:info');

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
  status: 'success',
  message: messages.welcome,
}));

const server = app.listen(
  process.env.PORT || 3000,
  () => infoLog(`Listening on port ${server.address().port}`)
);
