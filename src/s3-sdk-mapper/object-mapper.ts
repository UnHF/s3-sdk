import S3SDK from "@/s3-sdk-abstract";
import type { UploadObjectDTO } from "@/s3-sdk-dto";
import { createSignature } from "@/s3-sdk-signature";
import { createHash } from "crypto";

export default class ObjectMapper {
  constructor(private s3: S3SDK) {}

  async putObject(params: UploadObjectDTO) {
    const { bucketName, objectName, file } = params;
    const url = `/${bucketName}/${objectName}`;
    const date = new Date().toUTCString();

    const contentMd5 = createHash("md5").update(file).digest("hex");
    const contentType = "application/octet-stream";
    const canonicalizedHeaders = "";
    const signature = createSignature(
      "PUT",
      contentMd5,
      contentType,
      date,
      canonicalizedHeaders,
      url,
      this.s3.secretKey,
    );
    const authorization = `jingdong ${this.s3.accessKey}:${signature}`;
    return await this.s3.axiosInstance
      .put(url, file, {
        headers: {
          Authorization: authorization,
          Date: date,
          "Content-MD5": contentMd5,
          "Content-Type": contentType,
          "Content-Length": file.length.toString(),
        },
      })
      .catch();
  }
}
