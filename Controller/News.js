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

        req.body.ImageID = req.files.Image[0].id; req.body.ImageFileName = req.files.Image[0].filename; req.body.ImageOriginalName = req.files.Image[0].originalname;
        req.body.newsPdfID = req.files.newsPdf[0].id; req.body.newsPdf = req.files.newsPdf[0].filename; req.body.newsPdfOriginalName = req.files.newsPdf[0].originalname;
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

        // console.log(req.file.id);
        if( req.files.Image.length > 0)
        req.body.ImageID = req.files.Image[0].id; req.body.ImageFileName = req.files.Image[0].filename; req.body.ImageOriginalName = req.files.Image[0].originalname;

        if( req.files.newsPdf.length > 0)
        req.body.newsPdfID = req.files.newsPdf[0].id; req.body.newsPdf = req.files.newsPdf[0].filename; req.body.newsPdfOriginalName = req.files.newsPdf[0].originalname;
        
        
        let news = await News.findByIdAndUpdate(req.params.id,req.body);
        if(!news) return res.json({text:`News Not Found`,status:400});


        res.send({status:200,data:news,text:"Update Successfully"})
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