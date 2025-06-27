/**
 * 存储桶模型接口
 * 定义存储桶的基本属性和元数据结构
 */
export interface BucketModel {
  /** 存储桶的唯一标识ID */
  BucketId: number;

  /** 存储桶名称 */
  Name: string;

  /** 存储桶所有者的用户ID */
  OwnerId: number;

  /** 存储桶创建时间（ISO格式字符串） */
  CreationDate: string;

  /** 存储桶所在的地理位置/区域 */
  Location: string;
}

/**
 * 对象模型接口
 * 定义S3存储对象的基本属性和元数据结构
 */
export interface ObjectModel {
  /** 对象的键名（包含完整路径的文件名） */
  Key: string;

  /** 对象最后修改时间（ISO格式字符串） */
  LastModified: string;

  /** 对象的实体标签，通常是MD5哈希值，用于数据完整性验证 */
  ETag: string;

  /** 对象大小（以字节为单位） */
  Size: number;
}
