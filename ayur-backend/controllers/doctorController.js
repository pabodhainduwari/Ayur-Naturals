import Doctor from "../models/doctor.js";

// Get all doctors / filter
export const getDoctors = async (req, res) => {
  try {
    const { name, specialization } = req.query;
    const filter = {};

    if (name) {
      filter.$or = [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ];
    }
    if (specialization) {
      filter.specialization = { $regex: specialization, $options: "i" };
    }

    const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

// Add a doctor
export const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor" });
  }
};

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor" });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor" });
  }
};
