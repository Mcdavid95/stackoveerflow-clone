import swaggerJsDoc from 'swagger-jsdoc';
import { setup } from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Polly-Views API documentation',
    version: '1.0.0',
    description: 'Polly-Views auto generated swagger documentation',
    contact: {
      email: 'mcdavidemereuwa95@gmail.com'
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/api/*.js', 'src/routes/*.js'],
};


const specs = swaggerJsDoc(options);

module.exports = (router) => {
  router.get('/docs', setup(specs));
};
