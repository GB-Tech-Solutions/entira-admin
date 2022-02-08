const express = require('express');
const router = express.Router();

const {getAppt,getAppts,addAppt,deleteAppt,searchAppts} = require('../Controller/Appointment');

router.route("/")
.get(getAppts)
.post(addAppt)


router.route("/:id")
.get(getAppt)
.delete(deleteAppt)

router.route("/search")
.post(searchAppts)


module.exports = router;