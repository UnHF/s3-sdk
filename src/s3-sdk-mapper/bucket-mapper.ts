import S3SDK from "@/s3-sdk-abstract";
import type { QueryObjectListDTO } from "@/s3-sdk-dto";
import type { BucketModel, ObjectModel } from "@/s3-sdk-models";
import { createSignature } from "@/s3-sdk-signature";

export default class BucketMapper {
  constructor(private s3: S3SDK) {}

  async getService() {
    const url = "/";
    const date = new Date().toUTCString();
    const signature = createSignature(
      "GET",
      "",
      "",
      date,
      "",
      url,
      this.s3.secretKey,
    );
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;
    return await this.s3.axiosInstance
      .get<{
        Buckets: BucketModel[];
      }>(url, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
      })
      .catch();
  }

  async getBucket(bucketName: string, options?: Partial<QueryObjectListDTO>) {
    const url = `/${bucketName}`;
    const queryParams = new URLSearchParams(options).toString();
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;
    const date = new Date().toUTCString();
    const signature = createSignature(
      "GET",
      "",
      "",
      date,
      "",
      url,
      this.s3.secretKey,
    );
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;
    return await this.s3.axiosInstance
      .get<{
        Name: string;
        Prefix: string;
        Marker: string;
        Delimiter: string;
        StartTime: string;
        EndTime: string;
        MaxKeys: number;
        HasNext: boolean;
        Contents: ObjectModel[];
        CommonPrefixes: string[];
      }>(fullUrl, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
      })
      .catch();
  }
}
