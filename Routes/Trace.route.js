const express = require('express');

const router = express.Router();

const {trackSave} = require('../Controller/Trace.controller');


router.route("/")
.post(trackSave)


module.exports = router;