const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const VisitSchema = new mongoose.Schema({
    hashCode:{
        type:Number,
        default:null
    },
    body:{
        type:Object,
        default:true
    }
    
},{timestamps:true});


const pageVisits = new mongoose.model('Visits',VisitSchema, 'Visits');

module.exports.PageVisits = pageVisits;
