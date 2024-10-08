const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const DoctorsSchema = new mongoose.Schema({
    DoctorName: {
        type: String,
        required:true
    }, 
    Designation:{
        type:String,
        required:true
    } ,
    Qualification:{
        type:String,
        required:true
    } ,
    ImageID: {
        type: String,
        required: true
    },
    ImageFileName: {
        type: String,
        required: true
    },
    ImageOriginalName: {
        type: String,
        // required: true
    },
    ParaOne: {
        type: String,
        // required: true
    },
    ParaTwo: {
        type: String,
        // required: true
    },
    ParaThree: {
        type: String,
        // required: true
    },
    ParaFour: {
        type: String,
        // required: true
    },
    dateAdded:{
        type:Date,
        default:Date.now,
    },
    
});

// const validateData = (body)=> {
//     const schema = joi.object({
//         Heading: joi.string().required(),
//         Section:joi.string().required(),
//         ImageID: joi.String().required(),
//         ImageFileName:joi.String().required(),
//         ImageOriginalName:joi.String().required(),
//     })

//     return schema.validate(body);
// };

const Doctors = new mongoose.model('Doctors',DoctorsSchema, 'Doctors');

module.exports.Doctors = Doctors;
// module.exports.validateData = validateData;