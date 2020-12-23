const express = require('express');
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const router = express.Router();

const {upload} = require('../Sheared/Multer')
const {getNews,addNews,updateNews,deleteNews,getNew} = require('../Controller/News');

router.route("/")
.get(getNews)
.post(upload.single("Image"),addNews)


router.route("/:id")
.get(getNew)
.put(upload.single("Image"),updateNews)
.delete(deleteNews)



module.exports = router;