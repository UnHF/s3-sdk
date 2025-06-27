/**
 * 查询对象列表的数据传输对象
 */
export interface QueryObjectListDTO {
  /** 存储桶名称 */
  bucketName: string;

  /** 查询选项参数 */
  options?: Partial<{
    /** 分页标记，用于指定从哪个对象开始列举 */
    marker: string;
    /** 单次返回的最大对象数量 */
    "max-keys": string;
    /** 对象名称前缀过滤 */
    prefix: string;
    /** 分隔符，用于对对象名称进行分组 */
    delimiter: string;
  }>;
}

/**
 * 上传对象的数据传输对象
 */
export interface UploadObjectDTO {
  /** 目标存储桶名称 */
  bucketName: string;

  /** 对象名称（包含路径） */
  objectName: string;

  /** 要上传的文件内容缓冲区 */
  file: Buffer<ArrayBufferLike>;
}

/**
 * 查询单个对象的数据传输对象
 */
export interface QueryObjectDTO {
  /** 存储桶名称 */
  bucketName: string;

  /** 对象名称（包含路径） */
  objectName: string;
}

/**
 * 删除对象的数据传输对象
 */
export interface RemoveObjectDTO {
  /** 存储桶名称 */
  bucketName: string;

  /** 要删除的对象名称（包含路径） */
  objectName: string;
}
