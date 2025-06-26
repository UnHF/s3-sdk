import { createSignature } from "@unhf/s3-sdk-signature";
import { type Bucket } from "@unhf/s3-sdk-models";
import axios, { type AxiosInstance } from 'axios';

class S3SDK {
    private accessKey: string;
    private secretKey: string;
    axiosInstance: AxiosInstance;

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
    }

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
            this.secretKey
        )
        const authorization = `jingdong ${this.accessKey}:${signature}`;
        return await this.axiosInstance.get<{
            Buckets: Bucket[];
        }>(url, {
            headers: {
                Authorization: authorization,
                Date: date,
            }
        }).catch()
    }
}

export default S3SDK;
