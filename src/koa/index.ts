import Koa, { ParameterizedContext, Next } from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router({
  prefix: `/${process.env.API_ROOT_PATH}`,
});

router.get('/:id', (ctx: ParameterizedContext, next: Next) => {
  const { id } = ctx.params;
  console.log(`URL --> ${ctx.request.url}`);
  ctx.body = { value: id };
});

router.get('/', (ctx: ParameterizedContext, next: Next) => {
  ctx.body = { value: 'Hello World!' };
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
