import AdminRoute from "./Routes/AdminRoute";
import DoctorRoute from "./Routes/DoctorRoute";
import ManagerRoute from "./Routes/ManagerRoute";
import PatientRoute from "./Routes/PatientRoute";

function App() {
  return (
    <>
      <DoctorRoute />
      <AdminRoute />
      <ManagerRoute />
      <PatientRoute />
    </>
  );
}

export default App;


// import React from "react";
// import DicomUpload from "./pages/dashboard/doctor/DicomUpload";

// const App = () => {
//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>DICOM Viewer Application</h1>
//       <DicomUpload />
//     </div>
//   );
// };

// export default App;



