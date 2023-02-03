import {S3Client} from '@aws-sdk/client-s3';


const config = {
    region: import.meta.env.VITE_region,
    accessKeyId : import.meta.env.VITE_accessKeyId,
    secretAccessKey: import.meta.env.VITE_secretAccessKey,
    bucketName: import.meta.env.VITE_bucketName
}
const s3Client = new S3Client({
    region:config.region,
    credentials:{
        accessKeyId : config.accessKeyId,
        secretAccessKey:config.secretAccessKey,
    }
});


export {s3Client}

