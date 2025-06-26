import axios, { type AxiosInstance } from "axios";
import { BucketMapper, ObjectMapper } from "@/s3-sdk-mapper";
import S3SDK from "@/s3-sdk-abstract";
import {
  type BucketListVO,
  type DeleteObjectVO,
  type ObjectListVO,
  type QueryObjectVO,
  type UploadObjectVO,
} from "@/s3-sdk-vo";
import type {
  QueryObjectDTO,
  QueryObjectListDTO,
  RemoveObjectDTO,
  UploadObjectDTO,
} from "@/s3-sdk-dto";

class S3SDKImpl implements S3SDK {
  accessKey: string;
  secretKey: string;
  axiosInstance: AxiosInstance;
  private bucketMapper: BucketMapper;
  private objectMapper: ObjectMapper;

  constructor(
    accessKey: string,
    secretKey: string,
    host: string,
    endpoint: string,
  ) {
    console.log("S3SDK initialized");
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.axiosInstance = axios.create({
      baseURL: endpoint,
      timeout: 30_000,
      headers: {
        Host: host,
      },
      responseType: "json",
    });
    this.bucketMapper = new BucketMapper(this);
    this.objectMapper = new ObjectMapper(this);
  }

  async queryBucketList(): Promise<BucketListVO> {
    const result = await this.bucketMapper.getService();
    const { status, data } = result;
    if (status === 200) {
      return {
        code: 200,
        message: "Bucket list retrieved successfully",
        data: data.Buckets.map((bucket) => ({
          id: bucket.BucketId,
          name: bucket.Name,
          owner: bucket.OwnerId,
          createTime: bucket.CreationDate,
          region: bucket.Location,
        })),
      };
    }
    return {
      code: 500,
      message: "Failed to retrieve bucket list",
    };
  }

  async queryObjectList(params: QueryObjectListDTO): Promise<ObjectListVO> {
    const result = await this.bucketMapper.getBucket(params);
    const { status, data } = result;
    if (status === 200) {
      return {
        code: 200,
        message: "Object list retrieved successfully",
        data: {
          startTime: data.StartTime,
          endTime: data.EndTime,
          hasNext: data.HasNext,
          contents: data.Contents.map((item) => ({
            fileName: item.Key,
            changeTime: item.LastModified,
            size: item.Size,
          })),
        },
      };
    }
    return {
      code: 500,
      message: "Failed to retrieve object list",
    };
  }

  async uploadObject(params: UploadObjectDTO): Promise<UploadObjectVO> {
    const result = await this.objectMapper.putObject(params);
    const { status } = result;
    if (status === 200) {
      return {
        code: 200,
        message: "Object uploaded successfully",
      };
    }
    return {
      code: 500,
      message: "Failed to retrieve object list",
    };
  }

  async queryObject(params: QueryObjectDTO): Promise<QueryObjectVO> {
    const result = await this.objectMapper.getObject(params);
    const { status, data } = result;
    if (status === 200) {
      return {
        code: 200,
        message: "Object retrieved successfully",
        data: data,
      };
    }
    return {
      code: 500,
      message: "Failed to retrieve object",
    };
  }

  async removeObject(params: RemoveObjectDTO): Promise<DeleteObjectVO> {
    const result = await this.objectMapper.deleteObject(params);
    const { status } = result;
    if (status === 204) {
      return {
        code: 200,
        message: "Object removed successfully",
      };
    }
    return {
      code: 500,
      message: "Failed to remove object",
    };
  }
}

export { S3SDKImpl as S3SDK };
