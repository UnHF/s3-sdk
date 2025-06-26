export interface QueryObjectListDTO {
  bucketName: string;
  options?: Partial<{
    marker: string;
    "max-keys": string;
    prefix: string;
    delimiter: string;
  }>;
}

export interface UploadObjectDTO {
  bucketName: string;
  objectName: string;
  file: Buffer<ArrayBufferLike>;
}

export interface QueryObjectDTO {
  bucketName: string;
  objectName: string;
}

export interface RemoveObjectDTO {
  bucketName: string;
  objectName: string;
}
