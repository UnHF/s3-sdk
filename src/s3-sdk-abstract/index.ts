import { type AxiosInstance } from "axios";

abstract class S3SDK {
  abstract accessKey: string;
  abstract secretKey: string;
  abstract axiosInstance: AxiosInstance;
}

export default S3SDK;
