import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const handleBookNow = (doctor) => {
    navigate("/appointment-booking", { state: doctor }); // pass doctor data
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.firstName.toLowerCase().includes(search.toLowerCase()) ||
      doc.lastName.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full p-3 border rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc._id} className="p-4 border rounded shadow">
            <img
              src={doc.image || "/images/doctor1.jpg"}
              alt={doc.firstName}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-3">
              Dr. {doc.firstName} {doc.lastName}
            </h2>
            <p className="text-gray-600">{doc.specialization}</p>
            <p className="text-gray-500">{doc.email}</p>
            <p className="text-gray-500">{doc.phone}</p>
            <button
              onClick={() => handleBookNow(doc)}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-yellow-500 hover:text-black"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
