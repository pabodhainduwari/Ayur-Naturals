
import express from "express";

import {createAppointment, 
        getAppointments,
        updateAppointment,
        deleteAppointment
} from "../controllers/appointmentBookingController.js";
import Appointment from "../models/appointment.js";

const router = express.Router();

//create a new appointment
router.post("/", async(req, res)=>{
        try{
                const appointment = new Appointment(req,body);
                await appointment.save();
                res.status(201).json(appointment);
        }catch(err){
                console.error("Error creating appointment:", err.message);
                res.status(500).json({message: err.message})
        }
});
//get all appointments
router.get("/", async(req, res)=>{
  try{
    const appointments = await Appointment.find().sort({createdAt: -1});
    res.json(appointments);
  }catch(err){
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({message: err.message});
  }
}); 
router.put("/:id", updateAppointment);
router.delete("/:id",deleteAppointment);

export default router;