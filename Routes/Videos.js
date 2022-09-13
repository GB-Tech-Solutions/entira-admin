const express = require('express');
const mongoose = require("mongoose");

const path = require("path");
const router = express.Router();

const {upload} = require('../Sheared/Multer')
const {getVideo,addVideos, getVideos,deleteVideos} = require('../Controller/Videos');

router.route("/")
.get(getVideo)
.post(addVideos)

router.route("/all")
.get(getVideos)


router.route("/delete/:vid_id")
.delete(deleteVideos)






module.exports = router;