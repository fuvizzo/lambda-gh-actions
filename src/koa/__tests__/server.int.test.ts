/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'http';
import request from 'supertest';
import koaApp from '..';
import AppError from '../../error/app-error';

const app = request(http.createServer(koaApp.callback()));
const rootPath = process.env.API_ROOT_PATH;

expect(new AppError('', 500)).toBeInstanceOf(Error);

describe('APIs - unit tests', () => {
  describe('"healthcheck" endpoint', () => {
    it('succesfully returns a 200 response', async () => {
      const res = await app.get(`/${rootPath}/healthcheck`);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual('OK');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Root endpoint', () => {
    it('succesfully returns a 200 response', async () => {
      const res = await app.get(`/${rootPath}/`);
      expect(res.text).toEqual('Hello World!');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('"Users" endpoint', () => {
    describe('"get"', () => {
      it('succesfully returns a 200 response', async () => {
        const res = await app.get(`/${rootPath}/users`);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(2);
        expect(res.statusCode).toEqual(200);
      });
    });

    describe('"get" with mathing "id" param', () => {
      it('succesfully returns a 200 response', async () => {
        const res = await app.get(`/${rootPath}/users/foo`);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.id).toEqual('foo');
        expect(res.body.name).toEqual('Foo');
        expect(res.statusCode).toEqual(200);
      });
    });

    describe('"get" with wrong "id" param', () => {
      it('succesfully returns a 404 response', async () => {
        const res = await app.get(`/${rootPath}/users/some-id`);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.statusCode).toEqual(404);
      });
    });
  });
});
