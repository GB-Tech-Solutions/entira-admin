const mongoose = require('mongoose');
const joi = require('@hapi/joi');


const VisitSchema = new mongoose.Schema({
    hashCode:{
        type:String,
        default:null
    },
    date:{
        type:String,
        default: null
    },
    body:{
        type:Object,
        default:true
    }
    
},{timestamps:true});


const pageVisits = new mongoose.model('Visits',VisitSchema, 'Visits');

module.exports.PageVisits = pageVisits;
