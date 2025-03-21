import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientLogin from "../pages/patient/PatientLogin";
import Dashboard from "../pages/patient/dashboard/Dashboard";
import ViewDoctorByPatient from "../pages/dashboard/patient/ViewDoctorByPatient";
import PatientList from "../pages/dashboard/doctor/PatientList";
import DoctorMeeting from "../pages/dashboard/doctor/DoctorMeeting";
import ViewDoctorProfileByPatient from "../pages/dashboard/patient/ViewDoctorProfileByPatient";
import BookAppointment from "../pages/dashboard/patient/BookAppointment";
import AppointmentStepper from "../pages/dashboard/patient/BookAppointment";
import AppointmentPage from "../pages/dashboard/patient/AppointmentPage";
import AppointmentSuccess from "../pages/dashboard/doctor/AppointmentSuccess";
import PatientBookedAppointment from "../pages/dashboard/patient/PatientBookedAppointment";
import EditPatientProfile from "../pages/dashboard/patient/EditPatientProfile";
import DemoCreate from "../pages/doctor/dashboard/DemoCreate";
const PatientRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/patient/login" element={<PatientLogin />}></Route>
        <Route path="/patient/dashboard" element={<Dashboard />}></Route>
        <Route
          path="/patient/view-doctor"
          element={<ViewDoctorByPatient />}
        ></Route>

        <Route
          path="/patient/view-doctor-profile/:doctorId"
          element={<ViewDoctorProfileByPatient />}
        ></Route>

        <Route path="/doctor/demo-create" element={<DemoCreate />}></Route>

        <Route
          path="/book-appointment/:doctorId"
          element={<BookAppointment />}
        />

        <Route path="/book-appointment-steeper" element={<AppointmentPage />} />

        <Route
          path="/book-appointment-success"
          element={<AppointmentSuccess />}
        />

        <Route
          path="/view-patient-booked-appointment"
          element={<PatientBookedAppointment />}
        />

        <Route
          path="/view-patient-profile/:id"
          element={<EditPatientProfile />}
        />
      </Routes>
    </Router>
  );
};
export default PatientRoute;
