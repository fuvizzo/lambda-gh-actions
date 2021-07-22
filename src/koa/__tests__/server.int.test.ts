/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'http';
import request from 'supertest';
import koaApp from '..';

const app = request(http.createServer(koaApp.callback()));
const rootPath = process.env.API_ROOT_PATH;

describe('APIs - unit tests', () => {
  describe('"test get" endpoint', () => {
    it('succesfully returns a 200 response', async () => {
      const res = await app.get(`/${rootPath}/`);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.value).toEqual('Hello World!');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('"test get" endpoint with "id" param', () => {
    it('succesfully returns a 200 response', async () => {
      const res = await app.get(`/${rootPath}/some-id`);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.value).toEqual('some-id');
      expect(res.statusCode).toEqual(200);
    });
  });
});
