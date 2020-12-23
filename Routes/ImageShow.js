const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const {showFile} = require('../Controller/ImageShow');


router.route("/:filename")
.get(showFile)


module.exports = router;