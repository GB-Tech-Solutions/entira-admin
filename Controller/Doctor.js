const express = require('express');
const mongoose = require('mongoose');

const {Doctors} = require("../Model/Doctor");

const {getAuth,setAuth} = require('../Auth/Auth');


exports.addDoctor = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        // console.log(req.body);
        let data = new Doctors(req.body);
        let save = await data.save();
        return res.json({text:`Team Member added successfully`,status:200,save})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}
//token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTJlMzhiNWVlZTMxNWU4Yzc3NmQ2MyIsImlhdCI6MTYwODc0NDUzMX0.T8Ck96I4qaFnwwwDm_OVJ6Vv2i29ozG5PkssfrWH1t0
exports.getDoctors = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        let Doctor = await Doctors.find();
        if(!Doctor) return res.json({text:`No Doctors Added`,status:400});
        return res.send(Doctor);

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        next()
    }
}

exports.getDoctor = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        
        let Doctor = await Doctors.findById(req.params.id);
        if(!Doctor) return res.json({text:`Doctor Not Found`,status:400});
        return res.send(Doctor);

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}

exports.deleteDoctor = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        
        let Doctor = await Doctors.findByIdAndDelete(req.params.id);
        if(!Doctor) return res.json({text:`Teams Not Found`,status:400});
        return res.json({text:"Team Member Deleted",status:200});

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}

exports.updateDoctor = async(req, res,next) => {
    try {
        
        req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        
        let doctor = await Doctors.findByIdAndUpdate(req.params.id,req.body);
        if(!doctor) return res.json({text:`Team Not Found`,status:400});

        res.send({status:200,text:"Updated SuccessFully",data:doctor})

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}