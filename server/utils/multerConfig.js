const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require("dotenv").config();

//R2 SDK SETUP
const s3 = new AWS.S3({
  accessKeyId: process.env.R2_ACC_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_ACC_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ACC_CONNECTION_STRING,
  region: 'auto', // Required but ignored by R2
  s3ForcePathStyle: true,
  signatureVersion: 'v4'

});

// Multer configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.R2_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    }
  })
});

module.exports = upload;
