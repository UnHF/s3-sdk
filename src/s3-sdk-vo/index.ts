interface BaseVO<T> {
  code: number;
  message: string;
  data: T;
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
