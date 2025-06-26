import { S3SDK } from '.';
import * as dotenv from 'dotenv';

dotenv.config();

const accessKey = process.env.S3_ACCESS_KEY || '';
const secretKey = process.env.S3_SECRET_KEY || '';
const host = process.env.S3_HOST || '';
const endpoint = process.env.S3_ENDPOINT || '';

const s3 = new S3SDK(
    accessKey,
    secretKey,
    host,
    endpoint
)

s3.queryBucketList()
    .then(response => {
        console.log('Bucket List:', response.data);
    })
    .catch(error => {
        console.error('Error fetching bucket list:', error);
    })
    .finally(() => {
        console.log('Request completed');
    });
