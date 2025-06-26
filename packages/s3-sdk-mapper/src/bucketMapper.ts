import S3SDK from '@unhf/s3-sdk-abstract';
import type { Bucket } from '@unhf/s3-sdk-models';
import { createSignature } from "@unhf/s3-sdk-signature";

export default class BucketMapper {
    constructor(private s3: S3SDK) {}

    async getService () {
        const url = '/'
        const date = new Date().toUTCString();
        const signature = createSignature(
            'GET',
            '',
            '',
            date,
            '',
            url,
            this.s3.secretKey
        )
        const authorization = `jingdong ${this.s3.accessKey}:${signature}`;
        return await this.s3.axiosInstance.get<{
            Buckets: Bucket[];
        }>(url, {
            headers: {
                Authorization: authorization,
                Date: date,
            }
        }).catch()
    }
}
