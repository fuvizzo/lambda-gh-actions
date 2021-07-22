import { Handler } from 'aws-lambda';
import serverless from 'aws-serverless-koa';

import app from './koa';

const handler: Handler = serverless(app);

export default handler;
