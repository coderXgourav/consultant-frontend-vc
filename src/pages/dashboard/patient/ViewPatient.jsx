import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import axios from "axios";
import { Spin, message, Modal } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

const ViewPatient = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(""); // Global filter for search
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const token = localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/patient/get-patient`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatients(response.data.data);
      setLoading(false);
    } catch (err) {
      error(err.message);
      setLoading(false);
    }
  };

  const handleDeletePatient = async () => {
    setLoading(true);
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/patient/delete-patient/${selectedPatientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message } = result.data;
      success(message);
      setPatients((prev) =>
        prev.filter((patient) => patient._id !== selectedPatientId)
      );
      setSelectedPatientId(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      error(err.message);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleConfirmDelete = (patientId) => {
    setSelectedPatientId(patientId);
    Modal.confirm({
      title: "Are you sure you want to delete this patient?",
      onOk: handleDeletePatient,
      onCancel: () => setSelectedPatientId(null),
    });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortBy) return 0;

    let aValue, bValue;

    if (sortBy === "name") {
      aValue = `${a.first_name} ${a.last_name}`;
      bValue = `${b.first_name} ${b.last_name}`;
    } else if (sortBy === "doctor") {
      aValue = a.doctor ? `${a.doctor.firstName} ${a.doctor.lastName || ""}` : "N/A";
      bValue = b.doctor ? `${b.doctor.firstName} ${b.doctor.lastName || ""}` : "N/A";
    } else {
      aValue = a[sortBy];
      bValue = b[sortBy];
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredPatients = sortedPatients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const email = patient.email.toLowerCase();
    const address = patient.address.toLowerCase();
    const doctorName = patient.doctor
      ? `${patient.doctor.firstName} ${patient.doctor.lastName || ""}`.toLowerCase()
      : "n/a";

    return (
      fullName.includes(globalFilter.toLowerCase()) ||
      email.includes(globalFilter.toLowerCase()) ||
      address.includes(globalFilter.toLowerCase()) ||
      doctorName.includes(globalFilter.toLowerCase())
    );
  });

  return (
    <>
      {contextHolder}
      <div className="page-wrapper">
        <Topbar />
        <div className="main-container">
          <Sidebar />
          <div className="app-container">
            <div className="app-hero-header d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item text-primary" aria-current="page">
                  Patients List
                </li>
              </ol>
            </div>
            <div className="app-body">
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title">Patient List</h5>
                      <div className="d-flex align-items-center gap-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={globalFilter}
                          onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <a href="/add-patient" className="btn btn-primary ms-auto">
                          Add Patient
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <Spin spinning={loading} size="large">
                          <table className="table truncate m-0 align-middle">
                            <thead>
                              <tr>
                                <th onClick={() => handleSort("no")}>No.</th>
                                <th onClick={() => handleSort("name")}>
                                  Patient Name{" "}
                                  {sortBy === "name" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("gender")}>
                                  Gender{" "}
                                  {sortBy === "gender" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("age")}>
                                  Age{" "}
                                  {sortBy === "age" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("blood_group")}>
                                  Blood Group{" "}
                                  {sortBy === "blood_group" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("treatment")}>
                                  Treatment{" "}
                                  {sortBy === "treatment" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("mobile")}>
                                  Mobile{" "}
                                  {sortBy === "mobile" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("email")}>
                                  Email{" "}
                                  {sortBy === "email" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("address")}>
                                  Address{" "}
                                  {sortBy === "address" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th onClick={() => handleSort("doctor")}>
                                  Doctor{" "}
                                  {sortBy === "doctor" && (
                                    <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
                                  )}
                                </th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient, index) => (
                                  <tr key={patient._id}>
                                    <td>{index + 1}</td>
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
                                    <td>
                                      <span className="badge bg-info-subtle text-info">
                                        {patient.gender}
                                      </span>
                                    </td>
                                    <td>{patient.age}</td>
                                    <td>{patient.blood_group}</td>
                                    <td>{patient.treatment}</td>
                                    <td>{patient.mobile}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.address}</td>
                                    <td>
                                      {patient.doctor
                                        ? `${patient.doctor.firstName} ${patient.doctor.lastName || ""}`
                                        : "N/A"}
                                    </td>
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
                                          href={`/edit-patient/${patient._id}`}
                                          className="btn btn-outline-success btn-sm"
                                        >
                                          <i className="ri-edit-box-line" />
                                        </a>
                                        <a
                                          href={`/view-patients/${patient._id}`}
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
                                  <td
                                    colSpan={11} // Updated to 11 to account for new Doctor column
                                    style={{ color: "red", textAlign: "center" }}
                                  >
                                    {loading ? "Loading..." : "Patient Not Found.."}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </Spin>
                      </div>

                      <div className="modal fade" id="delRow" tabIndex={-1}>
                        <div className="modal-dialog modal-sm">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Confirm</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete the patient?
                            </div>
                            <div className="modal-footer">
                              <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                              >
                                No
                              </button>
                              <button
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleDeletePatient}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPatient;




// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";
// import axios from "axios";
// import { Spin, message, Modal } from "antd";

// const ViewPatient = () => {
//   const [loading, setLoading] = useState(false);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);
//   const [globalFilter, setGlobalFilter] = useState(""); // Global filter for search

//   const [sortBy, setSortBy] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

//   const token = localStorage.getItem("token");

//   const [messageApi, contextHolder] = message.useMessage();

//   const success = (message) => {
//     messageApi.open({
//       type: "success",
//       content: message,
//     });
//   };

//   const error = (message) => {
//     messageApi.open({
//       type: "error",
//       content: message,
//     });
//   };

//   const fetchPatients = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/patient/get-patient`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPatients(response.data.data);
//       setLoading(false);
//     } catch (err) {
//       error(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDeletePatient = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/patient/delete-patient/${selectedPatientId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const { message } = result.data;
//       success(message);
//       setPatients((prev) =>
//         prev.filter((patient) => patient._id !== selectedPatientId)
//       );
//       setSelectedPatientId(null);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       error(err.message);
//     }
//   };

//   const handleSort = (column) => {
//     if (sortBy === column) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortBy(column);
//       setSortOrder("asc");
//     }
//   };

//   const handleConfirmDelete = (patientId) => {
//     setSelectedPatientId(patientId);
//     Modal.confirm({
//       title: "Are you sure you want to delete this patient?",
//       onOk: handleDeletePatient,
//       onCancel: () => setSelectedPatientId(null),
//     });
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const sortedPatients = [...patients].sort((a, b) => {
//     if (!sortBy) return 0;

//     let aValue, bValue;

//     // Special case for sorting by "name"
//     if (sortBy === "name") {
//       aValue = `${a.first_name} ${a.last_name}`;
//       bValue = `${b.first_name} ${b.last_name}`;
//     } else {
//       aValue = a[sortBy];
//       bValue = b[sortBy];
//     }

//     if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   const filteredPatients = sortedPatients.filter((patient) => {
//     const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
//     const email = patient.email.toLowerCase();
//     const address = patient.address.toLowerCase();

//     return (
//       fullName.includes(globalFilter.toLowerCase()) ||
//       email.includes(globalFilter.toLowerCase()) ||
//       address.includes(globalFilter.toLowerCase())
//     );
//   });

//   return (
//     <>
//       {contextHolder}
//       <div className="page-wrapper">
//         <Topbar />
//         <div className="main-container">
//           <Sidebar />
//           <div className="app-container">
//             <div className="app-hero-header d-flex align-items-center">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                   <a href="/">Home</a>
//                 </li>
//                 <li className="breadcrumb-item text-primary" aria-current="page">
//                   Patients List
//                 </li>
//               </ol>
//             </div>
//             <div className="app-body">
//               <div className="row gx-3">
//                 <div className="col-sm-12">
//                   <div className="card">
//                   <div className="card-header d-flex align-items-center justify-content-between">
//                     <h5 className="card-title">Patient List</h5>
                
//                  <div className="d-flex align-items-center gap-5">
//                  <input
//                       type="text"
//                       className="form-control "
//                       placeholder="Search..."
//                       value={globalFilter}
//                       onChange={(e) => setGlobalFilter(e.target.value)}
//                     />
//                  <a href="/add-patient" className="btn btn-primary ms-auto">
//                       Add Patient
//                     </a>
//                  </div>
                    
//                   </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <Spin spinning={loading} size="large">
//                           <table className="table truncate m-0 align-middle">
//                             <thead>
//                               <tr>
//                                 <th onClick={() => handleSort("no")}>No.</th>
//                                 <th onClick={() => handleSort("name")}>
//                                   Patient Name{" "}
//                                   {sortBy === "name" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("gender")}>
//                                   Gender{" "}
//                                   {sortBy === "gender" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("age")}>
//                                   Age{" "}
//                                   {sortBy === "age" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("blood_group")}>
//                                   Blood Group{" "}
//                                   {sortBy === "blood_group" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("treatment")}>
//                                   Treatment{" "}
//                                   {sortBy === "treatment" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("mobile")}>
//                                   Mobile{" "}
//                                   {sortBy === "mobile" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("email")}>
//                                   Email{" "}
//                                   {sortBy === "email" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th onClick={() => handleSort("address")}>
//                                   Address{" "}
//                                   {sortBy === "address" && (
//                                     <span>{sortOrder === "asc" ? "🔼" : "🔽"}</span>
//                                   )}
//                                 </th>
//                                 <th>Actions</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {filteredPatients.length > 0 ? (
//                                 filteredPatients.map((patient, index) => (
//                                   <tr key={patient._id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                       <img
//                                         src="/assets/images/patient.png"
//                                         className="img-shadow img-2x rounded-5 me-1"
//                                         alt="Patient"
//                                       />
//                                       {patient.first_name} {patient.last_name}
//                                     </td>
//                                     <td>
//                                       <span className={`badge bg-info-subtle text-info`}>
//                                         {patient.gender}
//                                       </span>
//                                     </td>
//                                     <td>{patient.age}</td>
//                                     <td>{patient.blood_group}</td>
//                                     <td>{patient.treatment}</td>
//                                     <td>{patient.mobile}</td>
//                                     <td>{patient.email}</td>
//                                     <td>{patient.address}</td>
//                                     <td>
//                                       <div className="d-inline-flex gap-1">
//                                         <button
//                                           className="btn btn-outline-danger btn-sm"
//                                           data-bs-toggle="modal"
//                                           data-bs-target="#delRow"
//                                           onClick={() =>
//                                             setSelectedPatientId(patient._id)
//                                           }
//                                         >
//                                           <i className="ri-delete-bin-line" />
//                                         </button>
//                                         <a
//                                           href={`/edit-patient/${patient._id}`}
//                                           className="btn btn-outline-success btn-sm"
//                                         >
//                                           <i className="ri-edit-box-line" />
//                                         </a>
//                                         <a
//                                           href={`/view-patients/${patient._id}`}
//                                           className="btn btn-outline-info btn-sm"
//                                         >
//                                           <i className="ri-eye-line" />
//                                         </a>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 ))
//                               ) :  (
//                                 <tr>
//                                   <td
//                                     colSpan={10}
//                                     style={{
//                                       color: "red",
//                                       textAlign: "center",
//                                     }}
//                                   >
//                                     {loading
//                                       ? "Loading..."
//                                       : "Patient Not Found.."}
//                                   </td>
//                                 </tr>
//                               )}
//                             </tbody>
//                           </table>
//                         </Spin>
//                       </div>

//                       <div className="modal fade" id="delRow" tabIndex={-1}>
//                         <div className="modal-dialog modal-sm">
//                           <div className="modal-content">
//                             <div className="modal-header">
//                               <h5 className="modal-title">Confirm</h5>
//                               <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                               />
//                             </div>
//                             <div className="modal-body">
//                               Are you sure you want to delete the patient?
//                             </div>
//                             <div className="modal-footer">
//                               <button
//                                 className="btn btn-outline-secondary"
//                                 data-bs-dismiss="modal"
//                               >
//                                 No
//                               </button>
//                               <button
//                                 className="btn btn-danger"
//                                 data-bs-dismiss="modal"
//                                 onClick={handleDeletePatient}
//                               >
//                                 Yes
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>


//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewPatient;



