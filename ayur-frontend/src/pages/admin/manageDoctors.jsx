import { useEffect, useState } from "react";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    email: "",
    phone: "",
    image: ""
  });

  const fetchDoctors = async () => {
    const res = await fetch("http://localhost:5000/api/doctors");
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/doctors/${id}`, { method: "DELETE" });
    fetchDoctors();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Doctors</h1>

      {/* Add Doctor */}
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 border" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 border" />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} className="p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="p-2 border" />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} className="p-2 border" />
        <button type="submit" className="col-span-2 bg-yellow-500 px-4 py-2 rounded text-black font-bold">
          Add Doctor
        </button>
      </form>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="p-4 border rounded shadow">
            <img src={doc.image || "/images/default-doctor.jpg"} alt={doc.firstName} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-3">Dr. {doc.firstName} {doc.lastName}</h2>
            <p>{doc.specialization}</p>
            <p>{doc.email}</p>
            <p>{doc.phone}</p>
            <button onClick={() => handleDelete(doc._id)} className="mt-2 bg-red-500 text-white px-4 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
