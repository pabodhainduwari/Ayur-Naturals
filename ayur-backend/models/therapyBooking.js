import mongoose from "mongoose";

const therapyBookingSchema = mongoose.Schema({
  bookingId : {
        type:String,
        unique:true,
    },
  firstName: { 
    type: String, 
    required: true 
},
lastName: {
  type: String,
  required: true
},
  contactNumber: {
    type: String, 
    required: true 
},
  email: { 
    type: String 
},
  therapyType: { 
    type: String,
    required: true 
}, 
  preferredDate: { 
    type: Date, 
    required: true 
},
  preferredTime: { 
    type: String, 
    required: true 
},
  therapistName: {
     type: String, 
     required: true 
},
  additionalNotes: { 
    type: String 
},
 
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled"], 
    default: "Pending" 
}
}, { timestamps: true });

//Auto-generate bookingId before saving
therapyBookingSchema.pre("save", function(next){
  if(!this.bookingId){
    this.bookingId = "BK_"+Math.random().toString(36).substring(2, 5).toUpperCase();
  }
  next();
});

export default mongoose.model("TherapyBooking", therapyBookingSchema);