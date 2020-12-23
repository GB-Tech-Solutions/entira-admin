const express = require('express');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const {Admin} = require("../Model/Admin");

const {getAuth,setAuth} = require('../Auth/Auth')



exports.Login = async(req, res,next) => {
    try {
        //password hash: $2b$10$jmrdWuzWCgKGmLEEEF1eeewwhNwpAHKRa44TsJmKccpftGUEUeUzi
        // password : Password1744@2020 userName: entita-admin@entira.com
        
        // req.body.password = await bcrypt.hash(req.body.password,saltRounds);

        let user = await Admin.find({userName:req.body.userName});
        if(!user) return res.send({status:400,text:"Wrong Credentials"});

        let admin = user[0];

        let passwordAuth = await bcrypt.compare(req.body.password,admin.password);
        if(!passwordAuth ) return res.send({status:200,text:"Wrong Credentials"});

        let token = await setAuth({id:user[0]._id});


        return res.send({status:200,text:"Login Successful",user:user[0],token});

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
        next()
    }
}