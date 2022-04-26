import {AWS_REGION, AWS_SECRET, AWS_ACCESS_KEY} from '@env';
import * as AWS from 'aws-sdk';

const configuration = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION,
};
AWS.config.update(configuration);

export const docClient = new AWS.DynamoDB.DocumentClient();
