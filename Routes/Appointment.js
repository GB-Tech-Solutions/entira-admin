const express = require('express');
const router = express.Router();

const {getAppt,getAppts,addAppt} = require('../Controller/Appointment');

router.route("/")
.get(getAppts)
.post(addAppt)


router.route("/:id")
.get(getAppt)



module.exports = router;