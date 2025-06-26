import { type AxiosInstance } from 'axios';
import { type GetObjectVO } from './vo';

abstract class S3SDK {
    abstract accessKey: string;
    abstract secretKey: string;
    abstract axiosInstance: AxiosInstance;

    abstract getService (): Promise<GetObjectVO>
}

export default S3SDK;
export { type GetObjectVO };
