import type { BucketModel, ObjectModel } from "@/s3-sdk-models";

export type GetServiceMO = {
  Buckets: BucketModel[];
};

export type GetBucketMO = {
  Name: string;
  Prefix: string;
  Marker: string;
  Delimiter: string;
  StartTime: string;
  EndTime: string;
  MaxKeys: number;
  HasNext: boolean;
  Contents: ObjectModel[];
  CommonPrefixes: string[];
};

export type PutObjectMO = string;

export type GetObjectMO = string;

export type DeleteObjectMO = void;
