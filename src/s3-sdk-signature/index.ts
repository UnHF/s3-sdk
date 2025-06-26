import { createHmac } from "node:crypto";

/**
 * 🔐 生成S3 API请求签名
 *
 * 使用HMAC-SHA1算法对S3 API请求进行签名认证，确保请求的完整性和安全性 🛡️
 *
 * 📝 签名算法步骤：
 * 1. 🧩 构建待签名字符串，按照特定格式组合各个请求参数
 * 2. 🔑 使用Secret Access Key对待签名字符串进行HMAC-SHA1加密
 * 3. 📦 将加密结果进行Base64编码得到最终签名
 *
 * @param httpMethod 🌐 HTTP请求方法 (GET, POST, PUT, DELETE等)
 * @param contentMd5 🔍 请求体的MD5哈希值，如果没有请求体则为空字符串
 * @param contentType 📄 请求的Content-Type头，如果没有则为空字符串
 * @param date ⏰ 请求的时间戳，格式为RFC 2822标准时间格式
 * @param canonicalizedJSSHeaders 📋 标准化的S3自定义头部字符串
 * @param canonicalizedResource 🎯 标准化的资源路径字符串
 * @param secretKey 🔐 S3的Secret Access Key，用于HMAC签名
 * @returns ✨ 生成的Base64编码签名字符串
 *
 * @example
 * ```typescript
 * const signature = generateSignature(
 *   'GET',
 *   '',
 *   '',
 *   'Wed, 26 Jun 2025 12:00:00 GMT',
 *   'x-amz-date:Wed, 26 Jun 2025 12:00:00 GMT\n',
 *   '/bucket/object',
 *   'your-secret-key'
 * );
 * ```
 */
export function createSignature(
  httpMethod: string,
  contentMd5: string,
  contentType: string,
  date: string,
  canonicalizedHeaders: string,
  canonicalizedResource: string,
  secretKey: string,
): string {
  // 🧩 构建待签名字符串
  // 📋 格式: HTTP-Verb + "\n" + Content-MD5 + "\n" + Content-Type + "\n" + Date + "\n" + CanonicalizedHeaders + CanonicalizedResource
  const stringToSign = [
    httpMethod,
    contentMd5,
    contentType,
    date,
    canonicalizedHeaders + canonicalizedResource,
  ].join("\n");

  // 🔐 使用HMAC-SHA1算法对待签名字符串进行加密，并转换为Base64格式 ✨
  const signature = createHmac("sha1", secretKey)
    .update(stringToSign)
    .digest("base64");

  return signature;
}
