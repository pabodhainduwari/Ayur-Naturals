export default function AdminTherapyBookings({ bookings, confirmBooking, rejectBooking }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4">Therapy Bookings</h3>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="p-3 border">Booking ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Contact</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Therapy</th>
            <th classname="p-3 border">Therapist</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Time</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="p-3 border">{b.bookingId}</td>
              <td className="p-3 border">{b.firstName} {b.lastName}</td>
              <td className="p-3 border">{b.contactNumber}</td>
              <td className="p-3 border">{b.email}</td>
              <td className="p-3 border">{b.therapyType}</td>
              <td className="p-3 border">{b.therapistName}</td>
              <td className="p-3 border">{new Date(b.preferredDate).toLocaleDateString()}</td>
              <td className="p-3 border">{b.preferredTime}</td>
              <td className="p-3 border">
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    b.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="p-3 border">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => confirmBooking(b._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => rejectBooking(b._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
