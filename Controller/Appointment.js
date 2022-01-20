const express = require('express');
const mongoose = require('mongoose');

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



exports.addAppt = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        req.body.id = create_UUID()
        let data = new Appointment(req.body);
        let save = await data.save();
        return res.json({text:`Team Member added successfully`,status:200,data:save})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTJlMzhiNWVlZTMxNWU4Yzc3NmQ2MyIsImlhdCI6MTYwODc0NDUzMX0.T8Ck96I4qaFnwwwDm_OVJ6Vv2i29ozG5PkssfrWH1t0
exports.getAppts = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        let items = await Appointment.find();
        if(!items) return res.json({text:`No appointment added`,status:400});
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
        if(!item) return res.json({text:`Doctor Not Found`,status:400});
        return res.send(item);

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}