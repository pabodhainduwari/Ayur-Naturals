import therapyBooking from "../models/therapyBooking.js";

//create a new booking
export const createTherapyBooking = async(req, res)=>{
  try{
    const newTherapyBooking = new TherapyBooking(req.body);
    await newTherapyBooking.save();
    res.status(201).json({
      message: "Booking created successfully",
      booking: newTherapyBooking,
    });
    
  }catch(error){
    console.error("Error creating booking:", error);
    res.status(500).json({message: "Error creating booking", error: error.message});
  }
};

// Get all bookings
export const getTherapyBookings = async (req, res) => {
  try {
    const bookings = await TherapyBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update booking (Admin approves or changes payment status)
export const updateTherapyBooking = async (req, res) => {
  try {
    const updatedBooking = await TherapyBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete booking
export const deleteTherapyBooking = async (req, res) => {
  try {
    const deletedBooking = await TherapyBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};