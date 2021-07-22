import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
import * as _ from 'lodash';

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const val = _.random(100);
  const response = {
    statusCode: 200,
    body: JSON.stringify(`This is random: ${val}`),
  };
  return response;
};

export default handler;
