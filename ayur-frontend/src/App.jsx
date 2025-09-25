import TherapyBookingForm from './pages/home/therapyBooking'
import AdminDashboard from './pages/admin/adminDashboard'
import Doctors from './pages/home/doctors'
import AppointmentBooking from './pages/home/appointmentBooking'

function App() {
  

  return (
    
   /*<Routes>
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/appointment-booking" element={<AppointmentBooking />} />
      <Router path="/therapy-booking" element={<TherapyBookingForm/>}/>
      <Router path="/admin-dashboard" element={<AdminDachboard/>}/>
      
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>*/
    //<Doctors/>
    <AppointmentBooking/>
    //<AdminDashboard/>

    
  )
}

export default App
