import S3SDK from "@/s3-sdk-abstract";
import type { QueryObjectListDTO } from "@/s3-sdk-dto";
import type { GetBucketMO, GetServiceMO } from "@/s3-sdk-mo";
import { createSignature } from "@/s3-sdk-signature";

/**
 * 存储桶映射器类
 * 负责处理与存储桶相关的HTTP请求映射和签名认证
 */
export default class BucketMapper {
  /**
   * 构造函数
   * @param s3 - S3SDK实例，用于访问配置和HTTP客户端
   */
  constructor(private s3: S3SDK) {}

  /**
   * 获取S3服务信息（存储桶列表）
   * @returns Promise 返回包含所有存储桶信息的响应
   */
  async getService() {
    // 构建请求URL（根路径表示获取服务信息）
    const url = "/";

    // 生成当前UTC时间戳，用于签名和请求头
    const date = new Date().toUTCString();

    // 初始化签名所需的参数（对于GET请求，这些通常为空）
    const contentMd5 = "";
    const contentType = "";
    const canonicalizedHeaders = "";

    // 创建请求签名
    const signature = createSignature(
      "GET",
      contentMd5,
      contentType,
      date,
      canonicalizedHeaders,
      url,
      this.s3.secretKey,
    );

    // 构建授权头
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;

    // 发送HTTP GET请求
    return await this.s3.axiosInstance
      .get<GetServiceMO>(url, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
      })
      .catch();
  }

  /**
   * 获取指定存储桶中的对象列表
   * @param params - 查询参数，包含存储桶名称和可选的查询选项
   * @returns Promise 返回包含对象列表信息的响应
   */
  async getBucket(params: QueryObjectListDTO) {
    // 解构参数，获取存储桶名称和查询选项
    const { bucketName, options = {} } = params;

    // 构建基础URL路径
    const url = `/${bucketName}`;

    // 将查询选项转换为URL查询参数
    const queryParams = new URLSearchParams(options).toString();

    // 组装完整的请求URL
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    // 生成当前UTC时间戳
    const date = new Date().toUTCString();

    // 初始化签名所需的参数
    const contentMd5 = "";
    const contentType = "";
    const canonicalizedHeaders = "";

    // 创建请求签名（注意：签名使用的是基础URL，不包含查询参数）
    const signature = createSignature(
      "GET",
      contentMd5,
      contentType,
      date,
      canonicalizedHeaders,
      url,
      this.s3.secretKey,
    );

    // 构建授权头
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;

    // 发送HTTP GET请求
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
