import type { BucketModel, ObjectModel } from "@/s3-sdk-models";

/**
 * 获取S3服务信息的响应模型对象
 * 用于包装服务级别的API响应数据
 */
export type GetServiceMO = {
  /** 存储桶列表 */
  Buckets: BucketModel[];
};

/**
 * 获取存储桶内容的响应模型对象
 * 包含存储桶中的对象列表和分页信息
 */
export type GetBucketMO = {
  /** 存储桶名称 */
  Name: string;

  /** 对象名称前缀过滤条件 */
  Prefix: string;

  /** 分页标记，指示从哪个对象开始列举 */
  Marker: string;

  /** 分隔符，用于对对象名称进行分组 */
  Delimiter: string;

  /** 查询开始时间 */
  StartTime: string;

  /** 查询结束时间 */
  EndTime: string;

  /** 本次返回的最大对象数量 */
  MaxKeys: number;

  /** 是否还有更多对象（用于分页判断） */
  HasNext: boolean;

  /** 对象列表 */
  Contents: ObjectModel[];

  /** 公共前缀列表，用于目录层级显示 */
  CommonPrefixes: string[];
};

/**
 * 上传对象操作的响应模型对象
 * 通常包含上传成功后的ETag或其他标识信息
 */
export type PutObjectMO = string;

/**
 * 获取对象内容的响应模型对象
 * 包含对象的实际数据内容（通常为二进制数据或文本）
 */
export type GetObjectMO = string;

/**
 * 删除对象操作的响应模型对象
 * 删除操作通常不返回内容，因此为void类型
 */
export type DeleteObjectMO = void;
