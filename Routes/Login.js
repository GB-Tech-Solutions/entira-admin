const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const {Login} = require('../Controller/Login');

router.route("/")
.post(Login)

module.exports = router;