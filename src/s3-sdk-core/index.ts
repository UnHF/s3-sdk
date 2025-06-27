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

/**
 * S3SDK核心实现类
 * 提供S3对象存储服务的完整功能实现，包括存储桶管理和对象操作
 */
class S3SDKImpl implements S3SDK {
  /** S3访问密钥ID */
  accessKey: string;

  /** S3密钥 */
  secretKey: string;

  /** Axios HTTP客户端实例 */
  axiosInstance: AxiosInstance;

  /** 存储桶操作映射器 */
  private bucketMapper: BucketMapper;

  /** 对象操作映射器 */
  private objectMapper: ObjectMapper;

  /**
   * 构造函数 - 初始化S3SDK实例
   * @param accessKey - S3访问密钥ID
   * @param secretKey - S3密钥
   * @param host - S3服务主机地址
   * @param endpoint - S3服务端点URL
   */
  constructor(
    accessKey: string,
    secretKey: string,
    host: string,
    endpoint: string,
  ) {
    console.log("S3SDK initialized");

    // 保存认证信息
    this.accessKey = accessKey;
    this.secretKey = secretKey;

    // 创建HTTP客户端实例
    this.axiosInstance = axios.create({
      baseURL: endpoint,
      timeout: 30_000, // 30秒超时
      headers: {
        Host: host,
      },
      responseType: "json",
    });

    // 初始化操作映射器
    this.bucketMapper = new BucketMapper(this);
    this.objectMapper = new ObjectMapper(this);
  }

  /**
   * 查询存储桶列表
   * @returns Promise<BucketListVO> 返回存储桶列表信息
   */
  async queryBucketList(): Promise<BucketListVO> {
    // 调用存储桶映射器获取服务信息
    const result = await this.bucketMapper.getService();
    const { status, data } = result;

    // 处理成功响应
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

    // 处理失败响应
    return {
      code: 500,
      message: "Failed to retrieve bucket list",
    };
  }

  /**
   * 查询对象列表
   * @param params - 查询对象列表的参数
   * @returns Promise<ObjectListVO> 返回对象列表信息
   */
  async queryObjectList(params: QueryObjectListDTO): Promise<ObjectListVO> {
    // 调用存储桶映射器获取存储桶中的对象列表
    const result = await this.bucketMapper.getBucket(params);
    const { status, data } = result;

    // 处理成功响应
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

    // 处理失败响应
    return {
      code: 500,
      message: "Failed to retrieve object list",
    };
  }

  /**
   * 上传对象到存储桶
   * @param params - 上传对象的参数
   * @returns Promise<UploadObjectVO> 返回上传结果信息
   */
  async uploadObject(params: UploadObjectDTO): Promise<UploadObjectVO> {
    // 调用对象映射器上传对象
    const result = await this.objectMapper.putObject(params);
    const { status } = result;

    // 处理成功响应
    if (status === 200) {
      return {
        code: 200,
        message: "Object uploaded successfully",
      };
    }

    // 处理失败响应
    return {
      code: 500,
      message: "Failed to upload object",
    };
  }

  /**
   * 查询单个对象信息
   * @param params - 查询对象的参数
   * @returns Promise<QueryObjectVO> 返回对象信息
   */
  async queryObject(params: QueryObjectDTO): Promise<QueryObjectVO> {
    // 调用对象映射器获取对象信息
    const result = await this.objectMapper.getObject(params);
    const { status, data } = result;

    // 处理成功响应
    if (status === 200) {
      return {
        code: 200,
        message: "Object retrieved successfully",
        data: data,
      };
    }

    // 处理失败响应
    return {
      code: 500,
      message: "Failed to retrieve object",
    };
  }

  /**
   * 删除对象
   * @param params - 删除对象的参数
   * @returns Promise<DeleteObjectVO> 返回删除结果信息
   */
  async removeObject(params: RemoveObjectDTO): Promise<DeleteObjectVO> {
    // 调用对象映射器删除对象
    const result = await this.objectMapper.deleteObject(params);
    const { status } = result;

    // 处理成功响应 (HTTP 204 No Content 表示删除成功)
    if (status === 204) {
      return {
        code: 200,
        message: "Object removed successfully",
      };
    }

    // 处理失败响应
    return {
      code: 500,
      message: "Failed to remove object",
    };
  }
}

export { S3SDKImpl as S3SDK };
