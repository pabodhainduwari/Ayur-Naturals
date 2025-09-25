import { useEffect, useState } from "react";
import axios from "axios";
import {
  BiCheckCircle,
  BiXCircle,
  BiUserPlus,
} from "react-icons/bi";
import AdminTherapyBookings from "./adminBooking.jsx";
import AdminAppointments from "./adminAppointment.jsx";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("therapy"); // default view

  useEffect(() => {
    fetchBookings();
    fetchAppointments();
  }, []);

  // Fetch therapy bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/therapy-bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch doctor appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Confirm therapy booking
  const confirmBooking = async (id) => {
    await axios.put(`http://localhost:5000/api/therapy-bookings/${id}`, {
      status: "Confirmed",
    });
    fetchBookings();
  };

    // Confirm doctor appointments
  const confirmAppointment = async (id) => {
    await axios.put(`http://localhost:5000/api/appointments/${id}`, {
      status: "Confirmed",
    });
    fetchAppointments();
  };

  // Reject therapy booking
  const rejectBooking = async (id) => {
    await axios.put(`http://localhost:5000/api/therapy-bookings/${id}`, {
      status: "Cancelled",
    });
    fetchBookings();
  };

    // Reject doctor appointment
  const rejectAppointment = async (id) => {
    await axios.put(`http://localhost:5000/api/appointments/${id}`, {
      status: "Cancelled",
    });
    fetchAppointments();
  };



  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-400 mb-10">
          Ayur Naturals - Admin
        </h1>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("therapy")}
                className={`w-full text-left py-2 px-3 rounded transition ${
                  activeTab === "therapy"
                    ? "bg-yellow-500 text-black"
                    : "hover:bg-yellow-500 hover:text-black"
                }`}
              >
                Therapy Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full text-left py-2 px-3 rounded transition ${
                  activeTab === "appointments"
                    ? "bg-yellow-500 text-black"
                    : "hover:bg-yellow-500 hover:text-black"
                }`}
              >
                Appointments
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h2>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-yellow-500">
            <BiUserPlus className="text-yellow-500 w-10 h-10" />
            <div>
              <h3 className="text-gray-500">Total Therapy Bookings</h3>
              <p className="text-3xl font-bold text-gray-800">
                {bookings.length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-green-500">
            <BiCheckCircle className="text-green-500 w-10 h-10" />
            <div>
              <h3 className="text-gray-500">Confirmed</h3>
              <p className="text-3xl font-bold text-gray-800">
                {bookings.filter((b) => b.status === "Confirmed").length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border-l-4 border-red-500">
            <BiXCircle className="text-red-500 w-10 h-10" />
            <div>
              <h3 className="text-gray-500">Pending</h3>
              <p className="text-3xl font-bold text-gray-800">
                {bookings.filter((b) => b.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>

        {/* Show tables */}
        {activeTab === "therapy" && (
          <AdminTherapyBookings
            bookings={bookings}
            confirmBooking={confirmBooking}
            rejectBooking={rejectBooking}
          />
        )}

        {activeTab === "appointments" && (
          <AdminAppointments
            appointments={appointments}
            confirmAppointment={confirmAppointment}
          />
        )}
      </main>
    </div>
  );
}
