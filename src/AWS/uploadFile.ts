import * as fs from "fs";

import { s3Client } from "./aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile(file:any, filename: string) {
  const bucketParams = {
    Bucket: "youtube-clone-storage-kd",
    Key: filename,
    Body: file,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(data);
    if(data.$metadata.httpStatusCode === 200){
        console.log('successful upload')
    }
  } catch (err) {
    console.log("Error", err);
  }
}
