const express = require('express');
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const router = express.Router();
require('dotenv').config();

const {MongoLink} = require('../Sheared/exports_file');

const conn = mongoose.createConnection(MongoLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

    // create a storage to get or file information from html
// Storage
const storage = new GridFsStorage({
    url: MongoLink,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });

    
  ///here is the upload funtion intialized 
  const upload = multer({
    storage
  });

  module.exports.upload = upload;
  module.exports.gfs = gfs;