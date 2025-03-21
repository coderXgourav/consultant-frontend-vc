import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AddDoctor from "../pages/dashboard/doctor/AddDoctor";
import ViewDoctor from "../pages/dashboard/doctor/ViewDoctor";
import DoctorProfile from "../pages/dashboard/doctor/DoctorProfile";
import ViewPatient from "../pages/dashboard/patient/ViewPatient";
import AddPatient from "../pages/dashboard/patient/AddPatient";
import AddDepartment from "../pages/dashboard/department/AddDepartment";
import ViewDepartment from "../pages/dashboard/department/ViewDepartment";
import DepartmentEdit from "../pages/dashboard/department/DepartmentEdit";
import AdminAppointment from "../pages/dashboard/appointment/adminAppointment";
import AdminAppointmentList from "../pages/dashboard/appointment/adminAppointmentList";
import AdminBookAppointment from "../pages/dashboard/appointment/adminBookAppointment";
import AdminEditAppointment from "../pages/dashboard/appointment/adminEditAppointment";
import AdminPayments from "../pages/dashboard/payments/AdminPayments";
import EditDoctor from "../pages/dashboard/doctor/EditDoctor";
import ViewPatientProfile from "../pages/dashboard/patient/ViewPatientProfile";
import EditPatient from "../pages/dashboard/patient/EditPatient";
import DicomUpload from "../pages/dashboard/doctor/dicomupload";
// import Soon from "../pages/Soon";

const AdminRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/upload-dicom-file" element={<DicomUpload />}></Route>

          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/view-doctors" element={<ViewDoctor />}></Route>
          <Route path="/main-doctor/:doctorId" element={<DoctorProfile />}></Route>
          <Route path="/edit-doctor/:id" element={<EditDoctor />}></Route>
          <Route path="/view-patients" element={<ViewPatient />}></Route>
          <Route
            path="/view-patients/:id"
            element={<ViewPatientProfile />}
          ></Route>
          <Route path="/add-patient" element={<AddPatient />}></Route>
          <Route path="/edit-patient/:patientId" element={<EditPatient />}></Route>
          <Route path="/add-department" element={<AddDepartment />}></Route>
          <Route path="/view-department" element={<ViewDepartment />}></Route>
          <Route
            path="/admin-appointment"
            element={<AdminAppointment />}
          ></Route>
          <Route
            path="/admin-appointment-list"
            element={<AdminAppointmentList />}
          ></Route>
          <Route
            path="/admin-book-appointment"
            element={<AdminBookAppointment />}
          ></Route>
          <Route
            path="/admin-edit-appointment"
            element={<AdminEditAppointment />}
          ></Route>
          <Route path="/admin-payments" element={<AdminPayments />}></Route>
          <Route
            path="/edit-department/:departmentId"
            element={<DepartmentEdit />}
          ></Route>

          {/* <Route path="*" element={<Soon />}></Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default AdminRoute;
