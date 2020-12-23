const express = require('express');
const mongoose = require('mongoose');

const {Doctors} = require("../Model/Doctor");


exports.addDoctor = async(req, res,next) => {
    try {
        req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        console.log(req.body);
        let data = new Doctors(req.body);
        let save = await data.save();
        return res.json({text:`News added successfully`,status:200,save})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}

exports.getDoctors = async(req, res,next) => {
    try {
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
        let Doctor = await Doctors.findByIdAndDelete(req.params.id);
        if(!Doctor) return res.json({text:`Doctor Not Found`,status:400});
        return res.send(Doctor);

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}

exports.updateDoctor = async(req, res,next) => {
    try {
        if(req.file.id != ""){
            req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        }
        
        let doctor = await Doctors.findById(req.params.id);
        if(!doctor) return res.json({text:`News Not Found`,status:400});

        let data = new Doctors(req.body);
        let save = await data.save();

        res.send(save)

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}