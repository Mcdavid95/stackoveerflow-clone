import supertest from 'supertest';
import server from '../src/index';

const api = supertest.agent(server);

export default api;
