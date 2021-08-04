import Koa, { ParameterizedContext, Next } from 'koa';
import yamljs from 'yamljs';
import Router from 'koa-router';

import { koaSwagger, SwaggerOptions } from 'koa2-swagger-ui';
import AppError from '../error/app-error';
import { dependencies } from '../../package.json';

const { 'swagger-ui': swaggerVersion } = dependencies;

interface KoaSwaggerOptions extends SwaggerOptions {
  host?: string;
  basePath?: string;
}

const apiPrefix = `/${process.env.API_ROOT_PATH}`;

const app = new Koa();

const router = new Router({
  prefix: apiPrefix,
});
const spec: KoaSwaggerOptions = yamljs.load('./swagger.yaml');
spec.host = process.env.HOST;
spec.basePath = `/${process.env.API_ROOT_PATH}`;

app.use(
  koaSwagger({
    swaggerVersion: swaggerVersion.replace('^', ''),
    swaggerOptions: { spec },
  }),
);

const userRouter = new Router({
  prefix: '/users',
});

router.get('/healthcheck', async (ctx: ParameterizedContext, next: Next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  ctx.body = healthcheck;
  try {
    // TODO: add further things to check (e.g. connecting to dababase)
    // throw new Error('Service unavailable');
  } catch (e) {
    healthcheck.message = e.message;
    ctx.status = 503;
  }
  await next();
});

router.get('/', (ctx: ParameterizedContext, next: Next) => {
  ctx.body = 'Hello World!';
});

userRouter.get('/', (ctx: ParameterizedContext, next: Next) => {
  ctx.body = [
    { id: 'boo', name: 'Boo' },
    { id: 'foo', name: 'Foo' },
  ];
});

userRouter.get('/:id', (ctx: ParameterizedContext, next: Next) => {
  const { id } = ctx.params;
  console.log(`URL --> ${ctx.request.url}`);
  if (id === 'foo') {
    ctx.body = { id, name: 'Foo' };
    next();
  } else {
    throw new AppError('User not found', 404);
  }
});

userRouter.delete('/:id', (ctx: ParameterizedContext, next: Next) => {
  throw new AppError('Service not implemented', 501);
});

// Error handling middleware
app.use(async (ctx: ParameterizedContext, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err.message;
    // ctx.app.emit('error', err, ctx);
  }
});

router.use(userRouter.routes(), userRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export default app;
