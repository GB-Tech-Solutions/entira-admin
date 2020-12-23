const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    dateAdded:{
        type:Date,
        default:Date.now,
    },
    
});

const Admin = new mongoose.model('Admin',AdminSchema, 'Admin');

module.exports.Admin = Admin;
