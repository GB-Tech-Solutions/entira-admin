const express = require('express');
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const router = express.Router();

const {upload} = require('../Sheared/Multer')
const {addDoctor,getDoctors,getDoctor,deleteDoctor,updateDoctor} = require('../Controller/Doctor');

router.route("/")
.get(getDoctors)
.post(upload.single("Image"),addDoctor)

router.route("/:id")
.get(getDoctor)
.put(upload.single("Image"),updateDoctor)
.delete(deleteDoctor)

module.exports = router;