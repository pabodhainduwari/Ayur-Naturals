import mongoose from "mongoose";
const appointmentSchema =  new mongoose.Schema({
    appointmentId : {
        type:String,
        unique:true,
    },
    firstName : {
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    contactNumber : {
        type:Number,
        required:true,
    },
    email: { 
    type: String 
    },
    doctor : {
        type:String,
        required:true,
    },
    appointmentDate : {
        type:Date,
        required:true,
    },
    appointmentTime : {
        type:String,
        required:true,
    },
    reason : {
        type:String,
    },
    status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled"], 
    default: "Pending" 
    }
},{timestamps:true});
appointmentSchema.pre("save", function(next){
    if(!this.appointmentId){
        this.appointmentId = "AP_"+Math.random().toString(36).substring(2,5).toLocaleUpperCase();
    }
    next();
});

const Appointment = mongoose.model("appointment", appointmentSchema);
export default Appointment;