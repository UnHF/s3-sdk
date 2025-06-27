import { type AxiosInstance } from "axios";

/**
 * S3SDK抽象基类
 * 定义S3服务的基础结构和必需的属性
 * 所有具体的S3SDK实现都必须继承此抽象类并实现其抽象属性
 */
abstract class S3SDK {
  /** S3访问密钥ID，用于身份验证 */
  abstract accessKey: string;

  /** S3密钥，用于签名认证 */
  abstract secretKey: string;

  /** Axios HTTP客户端实例，用于发送HTTP请求 */
  abstract axiosInstance: AxiosInstance;
}

export default S3SDK;
