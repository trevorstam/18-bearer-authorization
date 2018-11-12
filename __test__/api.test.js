'use strict';

require('dotenv').config();

import {
  app as server
} from '../src/app.js';

import supergoose, {
  startDB,
  stopDB
} from './supergoose.js';
import User from '../src/auth/model.js';

const mockRequest = supergoose(server);

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('api', () => {

  it('should sign up', async () => {

    const userInfo = {
      username: 'foo',
      password: 'bar',
    };

    const token = await mockRequest.post('/signup').send(userInfo);
    expect(token).toBeDefined();
  });

  it('should sign in with token', async () => {
    const userInfo = {
      username: 'foo',
      password: 'bar',
    };

    let response = await mockRequest.post('/signup').send(userInfo);

    const token = response.body.token;
    console.log(token);
    response = await mockRequest.post('/signin').auth(token, {
      type: 'bearer'
    });

    expect(response.text).toBe(token);
  });

  it('should sign in with username/password', async () => {
    const userInfo = {
      username: 'foo',
      password: 'bar',
    };

    let response = await mockRequest.post('/signup').send(userInfo);

    const token = response.body.token;

    response = await mockRequest.post('/signin').auth(token, {
      type: 'bearer'
    });

    expect(response.text).toBe(token);
  });

});