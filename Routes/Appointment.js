const express = require('express');
const router = express.Router();

const {getAppt,getAppts,addAppt,deleteAppt} = require('../Controller/Appointment');

router.route("/")
.get(getAppts)
.post(addAppt)


router.route("/:id")
.get(getAppt)
.delete(deleteAppt)



module.exports = router;