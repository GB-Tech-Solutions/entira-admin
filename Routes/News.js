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
.post(upload.fields([
    {name:"Image",maxCount:1},
    {name:"newsPdf",maxCount:1}
]),addNews)


router.route("/:id")
.get(getNew)
.put(upload.single("Image"),updateNews)
.delete(deleteNews)



module.exports = router;