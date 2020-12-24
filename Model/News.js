const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const NewsSchema = new mongoose.Schema({
    Heading: {
        type: String,
        required:true
    }, 
    Section:{
        type:String,
        required:true
    } ,
    ImageID: {
        type: String,
       
    },
    ImageFileName: {
        type: String,
    
    },
    ImageOriginalName: {
        type: String,
        
    },
    dateAdded:{
        type:Date,
        default:Date.now,
    },
    
});

const validateData = (body)=> {
    const schema = joi.object({
        Heading: joi.string().required(),
        Section:joi.string().required(),
        ImageID: joi.String().required(),
        ImageFileName:joi.String().required(),
        ImageOriginalName:joi.String().required(),
    })

    return schema.validate(body);
};

const News = new mongoose.model('News',NewsSchema, 'News');

module.exports.News = News;
module.exports.validateData = validateData;