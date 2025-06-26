import S3SDK from "@/s3-sdk-abstract";
import type { QueryObjectListDTO } from "@/s3-sdk-dto";
import type { GetBucketMO, GetServiceMO } from "@/s3-sdk-mo";
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
      .get<GetServiceMO>(url, {
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
      .get<GetBucketMO>(fullUrl, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
      })
      .catch();
  }
}
