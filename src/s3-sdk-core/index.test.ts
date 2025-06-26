import { S3SDK } from ".";
import * as dotenv from "dotenv";

dotenv.config();

const accessKey = process.env.S3_ACCESS_KEY || "";
const secretKey = process.env.S3_SECRET_KEY || "";
const host = process.env.S3_HOST || "";
const endpoint = process.env.S3_ENDPOINT || "";

const s3 = new S3SDK(accessKey, secretKey, host, endpoint);

const main = async () => {
  s3.queryObjectList("hour-main-dev", {
    prefix: "exchangeCoupon",
  })
    .then((result) => {
      console.log("Object List:", result);
    })
    .catch((error) => {
      console.error("Error querying object list:", error);
    });
};

main();
