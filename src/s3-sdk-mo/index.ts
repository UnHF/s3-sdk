import type { BucketModel, ObjectModel } from "@/s3-sdk-models";

export interface GetServiceMO {
  Buckets: BucketModel[];
}

export interface GetBucketMO {
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
}
