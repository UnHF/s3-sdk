/**
 * 基础视图对象接口
 * 定义所有API响应的统一结构，包含状态码、消息和可选的数据字段
 * @template T - 数据字段的类型
 */
interface BaseVO<T> {
  /** HTTP状态码或业务状态码 */
  code: number;

  /** 响应消息，用于描述操作结果或错误信息 */
  message: string;

  /** 响应数据，根据不同接口返回不同类型的数据 */
  data?: T;
}

/**
 * 存储桶列表视图对象
 * 包含用户所有存储桶的信息列表
 */
export type BucketListVO = BaseVO<
  Array<{
    /** 存储桶ID */
    id: number;
    /** 存储桶名称 */
    name: string;
    /** 存储桶所有者ID */
    owner: number;
    /** 存储桶创建时间 */
    createTime: string;
    /** 存储桶所在区域 */
    region: string;
  }>
>;

/**
 * 对象列表视图对象
 * 包含存储桶中对象的列表信息和分页数据
 */
export type ObjectListVO = BaseVO<{
  /** 查询开始时间 */
  startTime: string;
  /** 查询结束时间 */
  endTime: string;
  /** 是否还有更多数据（用于分页判断） */
  hasNext: boolean;
  /** 对象内容列表 */
  contents: Array<{
    /** 文件名称（包含路径） */
    fileName: string;
    /** 文件最后修改时间 */
    changeTime: string;
    /** 文件大小（字节） */
    size: number;
  }>;
}>;

/**
 * 上传对象视图对象
 * 用于返回对象上传操作的结果状态
 */
export type UploadObjectVO = BaseVO<void>;

/**
 * 查询对象视图对象
 * 包含查询到的对象内容数据
 */
export type QueryObjectVO = BaseVO<string>;

/**
 * 删除对象视图对象
 * 用于返回对象删除操作的结果状态
 */
export type DeleteObjectVO = BaseVO<void>;
