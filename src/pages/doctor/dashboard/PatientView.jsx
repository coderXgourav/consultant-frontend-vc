import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";
import { message } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

const PatientView = () => {
  const doctorToken = localStorage.getItem("doctorToken");
  const decodedDoctorToken = jwtDecode(doctorToken);
  const doctorId = decodedDoctorToken.user._id;

  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, [doctorId, page]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-filter-patient?doctorId=${doctorId}&page=${page}&limit=10`
      );
      setPatients(response.data.patients);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDeletePatient = async () => {
    if (!selectedPatientId) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/delete-patient-by-doctor?doctorId=${doctorId}&patientId=${selectedPatientId}`
      );
      message.success("Patient deleted successfully");
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <Topbar />
        <div className="main-container">
          <Sidebar />
          <div className="app-container">
            <div className="app-hero-header d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                  <a href="index-2.html">Home</a>
                </li>
                <li className="breadcrumb-item text-primary">View Patient</li>
              </ol>
            </div>

            <div className="app-body">
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title">Patients List</h5>
                      {/* <a href="add-patient" className="btn btn-primary ms-auto">
                        Add Patient
                      </a> */}
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table truncate m-0 align-middle">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Patient Name</th>
                              <th>Gender</th>
                              <th>Age</th>
                              <th>Blood Group</th>
                              <th>Treatment</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patients.length > 0 ? (
                              patients.map((patient, index) => (
                                <tr key={patient._id}>
                                  <td>{index + 1 + (page - 1) * 10}</td>
                                  <td>
                                    {patient.profilePhoto ? (
                                      <img
                                        src={`${import.meta.env.VITE_API_URL}${patient.profilePhoto}`}
                                        className="img-shadow img-2x rounded-5 me-1"
                                        alt={`${patient.first_name} ${patient.last_name}`}
                                        style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                        onError={(e) => (e.target.src = "/assets/images/patient.png")}
                                      />
                                    ) : (
                                      <AccountCircleIcon
                                        className="img-shadow img-2x rounded-5 me-1"
                                        style={{ fontSize: "30px", color: "#757575" }}
                                      />
                                    )}
                                    {patient.first_name} {patient.last_name}
                                  </td>
                                  <td>{patient.gender}</td>
                                  <td>{patient.age}</td>
                                  <td>{patient.blood_group}</td>
                                  <td>{patient.treatment}</td>
                                  <td>{patient.mobile}</td>
                                  <td>{patient.email}</td>
                                  <td>{patient.address}</td>
                                  <td>
                                    <div className="d-inline-flex gap-1">
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delRow"
                                        onClick={() => setSelectedPatientId(patient._id)}
                                      >
                                        <i className="ri-delete-bin-line" />
                                      </button>
                                      <a
                                        href={`edit-patients/${patient._id}`}
                                        className="btn btn-outline-success btn-sm"
                                      >
                                        <i className="ri-edit-box-line" />
                                      </a>
                                      <a
                                        href={`patient-dashboard/${patient._id}`}
                                        className="btn btn-outline-info btn-sm"
                                      >
                                        <i className="ri-eye-line" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="10" className="text-center">
                                  No patients found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delRow" tabIndex={-1} aria-labelledby="delRowLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="delRowLabel">
                Confirm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">Are you sure you want to delete the patient?</div>
            <div className="modal-footer">
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  No
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeletePatient}
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientView;





// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import Sidebar from "../../../components/doctor/DrSidebar";
// import Topbar from "../../../components/doctor/Topbar";
// import { message } from "antd";

// const PatientView = () => {
//   const doctorToken = localStorage.getItem("doctorToken");
//   const decodedDoctorToken = jwtDecode(doctorToken);
//   const doctorId = decodedDoctorToken.user._id;

//   const [patients, setPatients] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);

//   useEffect(() => {
//     fetchPatients();
//   }, [doctorId, page]);

//   const fetchPatients = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/admin/get-filter-patient?doctorId=${doctorId}&page=${page}&limit=10`
//       );
//       setPatients(response.data.patients);
//       setTotalPages(response.data.pagination.totalPages);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   const handleDeletePatient = async () => {
//     if (!selectedPatientId) return;
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/admin/delete-patient-by-doctor?doctorId=${doctorId}&patientId=${selectedPatientId}`
//       );
//       message.success("Patient deleted successfully");
//       fetchPatients();
//     } catch (error) {
//       console.error("Error deleting patient:", error);
//       alert("Failed to delete patient");
//     }
//   };

//   return (
//     <>
//       <div className="page-wrapper">
//         <Topbar />
//         <div className="main-container">
//           <Sidebar />
//           <div className="app-container">
//             <div className="app-hero-header d-flex align-items-center">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                   <a href="index-2.html">Home</a>
//                 </li>
//                 <li className="breadcrumb-item text-primary">View Patient</li>
//               </ol>
//             </div>

//             <div className="app-body">
//               <div className="row gx-3">
//                 <div className="col-sm-12">
//                   <div className="card">
//                     <div className="card-header d-flex align-items-center justify-content-between">
//                       <h5 className="card-title">Patients List</h5>
//                       {/* <a href="add-patient" className="btn btn-primary ms-auto">
//                         Add Patient
//                       </a> */}
//                     </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table truncate m-0 align-middle">
//                           <thead>
//                             <tr>
//                               <th>No.</th>
//                               <th>Patient Name</th>
//                               <th>Gender</th>
//                               <th>Age</th>
//                               <th>Blood Group</th>
//                               <th>Treatment</th>
//                               <th>Mobile</th>
//                               <th>Email</th>
//                               <th>Address</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {patients.length > 0 ? (
//                               patients.map((patient, index) => (
//                                 <tr key={patient._id}>
//                                   <td>{index + 1 + (page - 1) * 10}</td>
//                                   <td>
//                                     <img
//                                       src="/assets/images/patient.png"
//                                       className="img-shadow img-2x rounded-5 me-1"
//                                       alt="Patient"
//                                     />
//                                     {patient.first_name} {patient.last_name}
//                                   </td>
//                                   <td>{patient.gender}</td>
//                                   <td>{patient.age}</td>
//                                   <td>{patient.blood_group}</td>
//                                   <td>{patient.treatment}</td>
//                                   <td>{patient.mobile}</td>
//                                   <td>{patient.email}</td>
//                                   <td>{patient.address}</td>
//                                   <td>
//                                     <div className="d-inline-flex gap-1">
//                                       <button
//                                         className="btn btn-outline-danger btn-sm"
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#delRow"
//                                         onClick={() => setSelectedPatientId(patient._id)}
//                                       >
//                                         <i className="ri-delete-bin-line" />
//                                       </button>
//                                       <a href={`edit-patients/${patient._id}`} className="btn btn-outline-success btn-sm">
//                                         <i className="ri-edit-box-line" />
//                                       </a>
//                                       <a href={`patient-dashboard/${patient._id}`} className="btn btn-outline-info btn-sm">
//                                         <i className="ri-eye-line" />
//                                       </a>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="10" className="text-center">No patients found</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <div className="modal fade" id="delRow" tabIndex={-1} aria-labelledby="delRowLabel" aria-hidden="true">
//         <div className="modal-dialog modal-sm">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="delRowLabel">Confirm</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             </div>
//             <div className="modal-body">Are you sure you want to delete the patient?</div>
//             <div className="modal-footer">
//               <div className="d-flex justify-content-end gap-2">
//                 <button className="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">
//                   No
//                 </button>
//                 <button className="btn btn-danger" onClick={handleDeletePatient} data-bs-dismiss="modal">
//                   Yes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PatientView;

