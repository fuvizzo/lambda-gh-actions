import { Handler } from 'aws-lambda';

import app from './src/koa';

const serverless = require('aws-serverless-koa');

const handler: Handler = serverless(app);

export default handler;
