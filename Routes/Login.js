const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const {Login} = require('../Controller/Login');
const {Registration} = require('../Controller/Registration');

router.route("/")
.post(Login)

router.route("/registration").post(Registration)

module.exports = router;