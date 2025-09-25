import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state; // doctor passed from Doctors.jsx

  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    contactNumber: "",
    email: "",
    doctor: doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Appointment booked successfully!");
        
        navigate("/doctors"); // redirect back to doctors page
      } else {
        alert("Error booking appointment.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error!");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-start bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/images/Ayurveda_bg.jpeg')" }}
    >
      <div className="relative z-10 bg-white/90 backdrop-blur-md border-2 border-yellow-500 rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8 border-b-2 border-yellow-500 pb-4">
          Book Your Preferred Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
              <label className="block font-medium">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-medium">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

          {/* Contact Number */}
          <div>
            <label className="block font-medium">Contact Number*</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Doctor Name (auto-filled) */}
          <div>
            <label className="block font-medium">Doctor</label>
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              readOnly
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium">Date*</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium">Time*</label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-yellow-500 hover:text-black transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
