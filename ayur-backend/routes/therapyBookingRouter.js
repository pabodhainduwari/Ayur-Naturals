
import express from "express";
import TherapyBooking from "../models/therapyBooking.js"

import {
  createTherapyBooking,
  getTherapyBookings,
  updateTherapyBooking,
  deleteTherapyBooking
} from "../controllers/therapyBookingController.js";


const router = express.Router();

 // Create booking
router.post("/", async (req, res) => {
  try{
    const newTherapyBooking = new TherapyBooking(req.body);
    await newTherapyBooking.save();
    res.status(201).json(newTherapyBooking);
  }catch(err){
    console.error("Error creating booking:", err.message);
    res.status(500).json({message: err.message})
  }
});     

// Get all bookings
router.get("/", async(req, res)=>{
  try{
    const bookings = await TherapyBooking.find().sort({createdAt: -1});
    res.json(bookings);
  }catch(err){
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({message: err.message});
  }
});          
router.put("/:id", updateTherapyBooking);     // Update booking
router.delete("/:id", deleteTherapyBooking);  // Delete booking

export default router;