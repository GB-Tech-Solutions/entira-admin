const express = require('express');
const mongoose = require("mongoose");

const path = require("path");
const router = express.Router();

const {upload} = require('../Sheared/Multer')
const {getVideos,addVideos} = require('../Controller/Videos');

router.route("/")
.get(getVideos)
.post(addVideos)






module.exports = router;