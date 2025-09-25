import { useState } from "react";

export default function TherapyBookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    therapyType: "",
    preferredDate: "",
    preferredTime: "",
    therapistName: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/therapy-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Booking submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          therapyType: "",
          preferredDate: "",
          preferredTime: "",
          therapistName: "",
          additionalNotes: "",
        });
      } else {
        alert("Error submitting booking");
      }
    } catch (err) {
      console.error(err);
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
          Book Your Ayurvedic Therapy
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
        {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Phone */}
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

          {/* Therapy */}
          <div>
            <label className="block font-medium">Therapy</label>
            <select
              name="therapyType"
              value={formData.therapyType}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">-- Choose --</option>
              <option value="Abhyanga">Abhyanga</option>
              <option value="Shirodhara">Shirodhara</option>
              <option value="Panchakarma">Panchakarma</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium">Time</label>
            <input
              type="time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Therapist */}
          <div>
            <label className="block font-medium">Therapist</label>
            <select
              name="therapistName"
              value={formData.therapistName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">-- Choose --</option>
              <option value="Kamal">Kamal Perera</option>
              <option value="Anil">Anil Fernando</option>
              <option value="Nimasha">Nimasha Jayasena</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit */}
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
