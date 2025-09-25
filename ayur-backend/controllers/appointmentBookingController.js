import appointment from "../models/appointment.js";

//Create appointments
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ 
      message: "Appointment created successfully", 
      appointment : appointment 
    });
  } catch (error) {
    console.error("Error creating appointment:",error);
    res.status(500).json({Message:"Error creating appointment",error: error.message});
  }
};

//Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointments
export const updateAppointment = async (req, res) => {
  try {
    const updateAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment updated", updateAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Booking
export const deleteAppointment = async (req, res) => {
  try {
    const deleteAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleteAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};