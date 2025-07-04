import { S3SDK } from ".";
import * as dotenv from "dotenv";

dotenv.config();

const accessKey = process.env.S3_ACCESS_KEY || "";
const secretKey = process.env.S3_SECRET_KEY || "";
const host = process.env.S3_HOST || "";
const endpoint = process.env.S3_ENDPOINT || "";

const s3 = new S3SDK(accessKey, secretKey, host, endpoint);

const main = async () => {
  // s3.queryBucketList().then((res) => {
  //   console.log("Bucket List:", res);
  // });

  // s3.queryObjectList({
  //   bucketName: "hour-main-dev",
  //   options: {
  //     prefix: "test.txt",
  //   },
  // }).then((res) => {
  //   console.log("Object List:", res);
  // });

  // s3.uploadObject({
  //   bucketName: "hour-main-dev",
  //   objectName: "test.txt",
  //   file: fs.readFileSync(path.resolve(__dirname, "test.txt")),
  // });

  // s3.queryObject({
  //   bucketName: "hour-main-dev",
  //   objectName: "test.txt",
  // }).then((res) => {
  //   console.log("Query Object Result:", res);
  // });

  s3.removeObject({
    bucketName: "hour-main-dev",
    objectName: "test.txt",
  }).then((res) => {
    console.log("Remove Object Result:", res);
  });
};

main();
