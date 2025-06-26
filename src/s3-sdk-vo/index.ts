interface BaseVO<T> {
  code: number;
  message: string;
  data?: T;
}

export type BucketListVO = BaseVO<
  Array<{
    id: number;
    name: string;
    owner: number;
    createTime: string;
    region: string;
  }>
>;

export type ObjectListVO = BaseVO<{
  startTime: string;
  endTime: string;
  hasNext: boolean;
  contents: Array<{
    fileName: string;
    changeTime: string;
    size: number;
  }>;
}>;
