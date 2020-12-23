const express = require('express');
const mongoose = require('mongoose');

const {News,validateData} = require("../Model/News");
const {getAuth,setAuth} = require('../Auth/Auth');
const { json } = require('express');

//get all bank with info
exports.getNews = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        let news = await News.find();
        if(!news) return res.json({text:`No News Added`,status:400});
        return res.send(news);

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        next()
    }
}

exports.getNew = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        let single_news = await News.findById(req.params.id);
        if(!single_news) return res.json({text:`News Not Found`,status:400});
        return res.send(single_news);

    } catch (error) {
        return res.json({text:`Error Found`,error,status:400});
        next()
    }
}

exports.addNews = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        // console.log(req.body,req.file);
        // const {error} = validateData(req.body);
        // if (error) return res.send({error:`${error}`,status:"400"});


        let data = new News(req.body);
        let save = await data.save();
        return res.json({text:`News added successfully`,status:200,save})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}

exports.updateNews = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        if(req.file.id != ""){
            req.body.ImageID = req.file.id; req.body.ImageFileName = req.file.filename; req.body.ImageOriginalName = req.file.originalname;
        }
        
        let news = await News.findById(req.params.id);
        if(!news) return res.json({text:`News Not Found`,status:400});

        let data = new News(req.body);
        let save = await data.save();

        res.send(save)
    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}

exports.deleteNews = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        let news = await News.findByIdAndDelete(req.params.id);
        return res.json({text:"News Deleted",status:200})
    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}