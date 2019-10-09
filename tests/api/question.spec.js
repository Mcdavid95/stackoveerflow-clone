/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import api from '../test.config';
import {
  normalUser
} from '../__mocks__/auth.mocks';
import questionMocks from '../__mocks__/question.mocks';

dotenv.config();

const { expect } = chai;
const { question } = questionMocks;

let jwtToken, questionId, answerId;

before((done) => {
  mongoose.createConnection(process.env.TEST_MONGODB_URI, () => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});

describe('Auth controller', () => {
  it('should signin a user', async () => {
    const { statusCode, body: { data: { token } } } = await api.post('/api/v1/auth/signin')
      .type('form')
      .set('Content-Type', 'application/json')
      .send(normalUser);
    jwtToken = token;
    expect(statusCode).to.equal(200);
  });
});

describe('Question controller', () => {
  it('should create a question', async () => {
    const { statusCode, body: { data } } = await api.post('/api/v1/questions')
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .send({ question });
    questionId = data.question._id;
    expect(statusCode).to.equal(201);
  });

  it('should get one question', async () => {
    const { statusCode } = await api.get(`/api/v1/questions/${questionId}`)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(200);
  });

  it('should get all questions', async () => {
    const { statusCode } = await api.get('/api/v1/questions')
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(200);
  });

  it('should not create a question if user is not authenticated', async () => {
    const { statusCode } = await api.post('/api/v1/questions')
      .type('form')
      .set('Content-Type', 'application/json')
      .send({ question });
    expect(statusCode).to.equal(403);
  });

  it('should not get question if questionId is invalid', async () => {
    const { statusCode } = await api.get('/api/v1/questions/57bgeke7leh7')
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(404);
  });
});

describe('Answer controller', () => {
  it('should create an answer to a question', async () => {
    const { statusCode, body: { data: { answer } } } = await api.post(`/api/v1/answers/question/${questionId}`)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .send({ answer: question });
    answerId = answer._id;
    expect(statusCode).to.equal(201);
  });

  it('should get one answer', async () => {
    const { statusCode } = await api.get(`/api/v1/answers/${answerId}`)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(200);
  });

  it('should get all answers', async () => {
    const { statusCode } = await api.get(`/api/v1/answers/question/${questionId}`)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(200);
  });

  it('should not answer a question if user is not authenticated', async () => {
    const { statusCode } = await api.post(`/api/v1/answers/question/${questionId}`)
      .type('form')
      .set('Content-Type', 'application/json')
      .send({ question });
    expect(statusCode).to.equal(403);
  });

  it('should not get an answer if answerId is invalid', async () => {
    const { statusCode } = await api.get('/api/v1/answers/57bgeke7leh7')
      .type('form')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken);
    expect(statusCode).to.equal(404);
  });
});
