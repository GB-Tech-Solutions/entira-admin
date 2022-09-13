const express = require('express');
const mongoose = require('mongoose');

const {Videos} = require("../Model/Videos");
const {getAuth,setAuth} = require('../Auth/Auth');
const { json } = require('express');

//get all bank with info
exports.getVideo = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        let item = await Videos.findOne().sort({dateAdded: -1});
        if(!item) return res.json({text:`No videos added`,status:400});
        return res.send([item]);

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        next()
    }
}

exports.getVideos = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});

        let items = await Videos.find();
        if(!items) return res.json({text:`No videos added`,status:400});
        return res.send(items);

    } catch (error) {
        return res.json({text:`Found Error`,error,status:400});
        next()
    }
}



exports.addVideos = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        const {title,VideoLink} = req.body;
        
        let data = new Videos({VideoLink:VideoLink,title:title});
        let save = await data.save();
        return res.json({text:`Video added successfully`,status:200,save})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}

exports.deleteVideos = async(req, res,next) => {
    try {
        let auth = getAuth(req.headers.token);
        if (!auth.id) return res.json({text:`Token Denied`,status:403});
        const {vid_id} = req.params;
        const delVid = await Videos.findByIdAndDelete(vid_id)
        return res.json({text:`Video deleted successfully`,status:200,delVid})

    } catch (error) {
        return res.json({text:` Error Found `,error,status:400});
    }
}




