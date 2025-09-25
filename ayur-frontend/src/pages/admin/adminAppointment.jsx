export default function AdminAppointments({ appointments, confirmAppointment }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4">Doctor Appointments</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-yellow-500 text-black">
            
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Doctor</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Notes</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{a.name}</td>
              <td className="p-3">{a.email}</td>
              <td className="p-3">{a.contactNumber}</td>
              <td className="p-3">{a.doctor}</td>
              <td className="p-3">{a.appointmentDate}</td>
              <td className="p-3">{a.appointmentTime}</td>
              <td className="p-3">{a.reason}</td>
              <td className="p-3">{a.status}</td>
              <td className="p-3">
                {a.status === "Pending" && (
                  <button
                    onClick={() => confirmAppointment(a._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
