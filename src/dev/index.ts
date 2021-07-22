import app from '../koa';

app.listen(process.env.LISTENING_PORT, () =>
  console.log(
    `Koa is listening to http://localhost:${process.env.LISTENING_PORT}`,
  ),
);
