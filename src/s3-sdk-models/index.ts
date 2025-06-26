export interface BucketModel {
  BucketId: number;
  Name: string;
  OwnerId: number;
  CreationDate: string;
  Location: string;
}

export interface ObjectModel {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
}
