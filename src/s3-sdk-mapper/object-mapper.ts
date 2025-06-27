import S3SDK from "@/s3-sdk-abstract";
import type {
  QueryObjectDTO,
  RemoveObjectDTO,
  UploadObjectDTO,
} from "@/s3-sdk-dto";
import type { DeleteObjectMO, GetObjectMO, PutObjectMO } from "@/s3-sdk-mo";
import { createSignature } from "@/s3-sdk-signature";
import { createHash } from "crypto";

/**
 * 对象映射器类
 * 负责处理与S3对象相关的HTTP请求映射，包括上传、下载、删除等操作
 */
export default class ObjectMapper {
  /**
   * 构造函数
   * @param s3 - S3SDK实例，用于访问配置和HTTP客户端
   */
  constructor(private s3: S3SDK) {}

  /**
   * 上传对象到指定存储桶
   * @param params - 上传参数，包含存储桶名称、对象名称和文件内容
   * @returns Promise 返回上传操作的响应结果
   */
  async putObject(params: UploadObjectDTO) {
    // 解构参数获取上传信息
    const { bucketName, objectName, file } = params;

    // 构建对象的URL路径
    const url = `/${bucketName}/${objectName}`;

    // 生成当前UTC时间戳
    const date = new Date().toUTCString();

    // 计算文件内容的MD5哈希值，用于数据完整性验证
    const contentMd5 = createHash("md5").update(file).digest("hex");

    // 设置内容类型为二进制流
    const contentType = "application/octet-stream";

    // 规范化头部（当前为空）
    const canonicalizedHeaders = "";

    // 创建PUT请求的签名
    const signature = createSignature(
      "PUT",
      contentMd5,
      contentType,
      date,
      canonicalizedHeaders,
      url,
      this.s3.secretKey,
    );

    // 构建授权头
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;

    // 发送PUT请求上传文件
    return await this.s3.axiosInstance
      .put<PutObjectMO>(url, file, {
        headers: {
          Authorization: authorization,
          Date: date,
          "Content-MD5": contentMd5,
          "Content-Type": contentType,
          "Content-Length": file.length.toString(),
        },
      })
      .catch();
  }

  /**
   * 获取指定对象的内容
   * @param params - 查询参数，包含存储桶名称和对象名称
   * @returns Promise 返回包含对象数据的响应结果
   */
  async getObject(params: QueryObjectDTO) {
    // 解构参数获取存储桶和对象信息
    const { bucketName, objectName } = params;

    // 构建对象的URL路径
    const url = `/${bucketName}/${objectName}`;

    // 生成当前UTC时间戳
    const date = new Date().toUTCString();

    // 对于GET请求，这些参数通常为空
    const contentMd5 = "";
    const contentType = "";
    const canonicalizedHeaders = "";

    // 创建GET请求的签名
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

    // 发送GET请求获取对象数据
    return await this.s3.axiosInstance
      .get<GetObjectMO>(url, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
        responseType: "arraybuffer", // 设置为 arraybuffer 以正确处理二进制数据
      })
      .catch();
  }

  /**
   * 删除指定的对象
   * @param params - 删除参数，包含存储桶名称和对象名称
   * @returns Promise 返回删除操作的响应结果
   */
  async deleteObject(params: RemoveObjectDTO) {
    // 解构参数获取存储桶和对象信息
    const { bucketName, objectName } = params;

    // 构建对象的URL路径
    const url = `/${bucketName}/${objectName}`;

    // 生成当前UTC时间戳
    const date = new Date().toUTCString();

    // 对于DELETE请求，这些参数通常为空
    const contentMd5 = "";
    const contentType = "";
    const canonicalizedHeaders = "";

    // 创建DELETE请求的签名
    const signature = createSignature(
      "DELETE",
      contentMd5,
      contentType,
      date,
      canonicalizedHeaders,
      url,
      this.s3.secretKey,
    );

    // 构建授权头
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;

    // 发送DELETE请求删除对象
    return await this.s3.axiosInstance
      .delete<DeleteObjectMO>(url, {
        headers: {
          Authorization: authorization,
          Date: date,
        },
      })
      .catch();
  }
}
