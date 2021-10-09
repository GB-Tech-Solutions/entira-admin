const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const VideosSchema = new mongoose.Schema({
    VideoLink: {
        type: String,
        required:true
    }, 
   
    
    dateAdded:{
        type:Date,
        default:Date.now,
    },
    
});



const Videos = new mongoose.model('Videos',VideosSchema, 'Videos');

module.exports.Videos = Videos;
