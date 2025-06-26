import axios, { type AxiosInstance } from 'axios';
import { BucketMapper } from "@/s3-sdk-mapper";
import S3SDK from '@/s3-sdk-abstract';
import { type BucketListVO } from '@/s3-sdk-vo';

class S3SDKImpl implements S3SDK {
    accessKey: string;
    secretKey: string;
    axiosInstance: AxiosInstance;
    private bucketMapper: BucketMapper;

    constructor (
        accessKey: string, 
        secretKey: string,
        host: string,
        endpoint: string
    ) {
        console.log("S3SDK initialized");
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.axiosInstance = axios.create({
            baseURL: endpoint,
            timeout: 30000,
            headers: {
                Host: host,
            },
            responseType: 'json',
        })
        this.bucketMapper = new BucketMapper(this);
    }

    async queryBucketList (): Promise<BucketListVO> {
        const result = await this.bucketMapper.getService()
        const { data } = result;
        if (data.Buckets && Array.isArray(data.Buckets)) {
            return {
                code: 200,
                message: 'Bucket list retrieved successfully',
                data: data.Buckets.map(bucket => ({
                    id: bucket.BucketId,
                    name: bucket.Name,
                    owner: bucket.OwnerId,
                    createTime: bucket.CreationDate,
                    region: bucket.Location
                }))
            }
        }
        return {
            code: 500,
            message: 'Failed to retrieve bucket list',
            data: []
        }
    }
}

export { S3SDKImpl as S3SDK };
