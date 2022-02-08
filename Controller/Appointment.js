const express = require('express');
const mongoose = require('mongoose');
const {subject, template } = require('../Sheared/Email/templateGmail');
const {sendMessage, authorize,from,to } = require('../Sheared/Email/gmailConfig');
const fs = require("fs");
const {Appointment} = require("../Model/Appointment");

const {getAuth,setAuth} = require('../Auth/Auth');

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxx-xxxx-yxxx-yxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
// 1642-7425-6496-0



exports.addAppt = async(req, res,next) => {
    // try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        const {scheduleDate, scheduleTime, name,email} = req.body;
        req.body.id = create_UUID()
        let data = new Appointment(req.body);
        let save = await data.save();

        const mailDetails = {
			mailOptions: {
				to: to,
                cc:`${email}`,
				from: `${from}`,
				subject: subject,
				body: template(scheduleDate,scheduleTime,name)
			},
			res: res,
		};

		fs.readFile("./Sheared/Email/credGmail.json", (err, content) => {
			if (err) {
				return res.status(400).json({
					message: message.custom('Unable to send email!'),
					error: err
				});
			}
			authorize(JSON.parse(content), sendMessage, mailDetails);
		});
        return res.json({text:`Appointments added successfully`,status:200})

    // } catch (error) {
    //     return res.json({text:` Error Found `,error,status:400});
    // }
}
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTJlMzhiNWVlZTMxNWU4Yzc3NmQ2MyIsImlhdCI6MTYwODc0NDUzMX0.T8Ck96I4qaFnwwwDm_OVJ6Vv2i29ozG5PkssfrWH1t0
exports.getAppts = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        let items = await Appointment.find({view:true});
        if(!items) return res.json({text:`No appointment found`,status:400});
        return res.send(items);

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        next()
    }
}

exports.getAppt = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        
        let item = await Appointment.findById(req.params.id);
        if(!item) return res.json({text:`Appointment Not Found`,status:400});
        return res.send(item);

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}

exports.deleteAppt = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        
        let item = await Appointment.findByIdAndUpdate(req.params.id,{$set:{view:false}});
        if(!item) return res.json({text:`Appointment Not Found`,status:400});
        return res.send({item,text:"Appointment deleted"});

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}