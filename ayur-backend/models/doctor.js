import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  firstName: { 
    type: String, 
    required: true },
  lastName: { 
    type: String, 
    required: true },
  specialization: { 
    type: String, 
    required: true },
  email: { 
    type: String },
  phone: { 
    type: String },
  image: 
  { type: String },
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
