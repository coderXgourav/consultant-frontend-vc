import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorLogin from "../pages/doctor/DoctorLogin";
import DoctorSignUp from "../pages/doctor/DoctorSignup";
import Dashboard from "../pages/doctor/dashboard/Dashboard";
import PatientView from "../pages/doctor/dashboard/PatientView";
import AddStaff from "../pages/doctor/dashboard/AddStaff";
import ViewStaff from "../pages/doctor/dashboard/ViewStaff";
import EditPatientByDoctor from "../pages/doctor/EditPatientByDoctor";
import DoctorMeeting from "../pages/dashboard/doctor/DoctorMeeting";
import PatientList from "../pages/dashboard/doctor/PatientList";
import RoomPage from "../pages/dashboard/doctor/screens/RoomPage";
import { SocketProvider } from "../pages/dashboard/doctor/context/SocketProvider";
import LobbyScreen from "../pages/dashboard/doctor/screens/Lobby";
import PatientMeeting from "../pages/dashboard/doctor/screens/PatientMeeting";
import CreateMeeting from "../pages/dashboard/doctor/screens/CreatingMeeting";
import PatientRoomPage from "../pages/dashboard/doctor/screens/PatientRoomPage";
import AllPatientMeeting from "../pages/dashboard/doctor/AllPatientMeeting";
import AllDoctorAppointment from "../pages/dashboard/doctor/AllDoctorAppointment";
import ManageAvailbility from "../pages/dashboard/doctor/ManageAvailability";
import DemoCreate from "../pages/doctor/dashboard/DemoCreate";

const DoctorRoute = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/doctor" element={<DoctorLogin />} />
          <Route path="/doctor/signup" element={<DoctorSignUp />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<Dashboard />} />
          <Route path="/doctor/view-patients" element={<PatientView />} />
          <Route
            path="/doctor/edit-patients/:patientId"
            element={<EditPatientByDoctor />}
          />
          <Route path="/doctor/add-staff" element={<AddStaff />} />
          <Route
            path="/doctor/view-appoinment-manager"
            element={<ViewStaff />}
          />
          <Route path="/doctor/create" element={<CreateMeeting />} />
          {/* Patient page where they accept the meeting */}
          <Route path="/patient/meeting/:roomId" element={<PatientMeeting />} />
          {/* Both doctor and patient will join the room here */}
          <Route path="/doctor/meeting/:roomId" element={<RoomPage />} />
          <Route
            path="/patients/meeting/:roomId"
            element={<PatientRoomPage />}
          />
          <Route path="/doctor/all-meeting" element={<AllPatientMeeting />} />
          <Route
            path="/doctor/all-appointments"
            element={<AllDoctorAppointment />}
          />
          <Route path="/patient/demo-meeting" element={<DemoCreate />} />

          <Route
            path="/doctor/availability/:id"
            element={<ManageAvailbility />}
          />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default DoctorRoute;
