const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    scheduleTime:{
        type:String,
        required:true
    },
    scheduleDate:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    view:{
        type:Boolean,
        default:true
    },
    massage:{
        type:String,
        default:null
    },
    dob:{
        type:String,
        required:true
    },
    state:{
        type:String,
        default:"initiated" // initiated accepted processing processed completed cancelled
    }
    
},{timestamps:true});

const Appointment = new mongoose.model('Appointment',AppointmentSchema, 'Appointments');

module.exports.Appointment = Appointment;