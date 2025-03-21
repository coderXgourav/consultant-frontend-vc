import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { Spin, message } from "antd";

const AdminAppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([
    {
      _id: "1",
      patientName: "John Doe",
      age: 30,
      consultingDoctor: "Dr. Smith",
      department: "Cardiology",
      date: "2025-01-20",
      time: "10:30 AM",
      disease: "Heart Disease",
    },
    {
      _id: "2",
      patientName: "Jane Smith",
      age: 25,
      consultingDoctor: "Dr. Brown",
      department: "Dermatology",
      date: "2025-01-22",
      time: "2:00 PM",
      disease: "Skin Rash",
    },
    {
      _id: "3",
      patientName: "Alice Johnson",
      age: 40,
      consultingDoctor: "Dr. Green",
      department: "Neurology",
      date: "2025-01-23",
      time: "11:00 AM",
      disease: "Migraine",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const getSortIcon = (field) => {
    if (sortField === field) {
      return (
        <span style={{ color: "#116af0", marginLeft: "5px" }}>
          {sortOrder === "asc" ? "▲" : "▼"}
        </span>
      );
    }
    return null;
  };
  

  const filteredPatients = patients
  .filter((patient) =>
    (patient.patientName || "").toLowerCase().includes(searchTerm) ||
    (patient.consultingDoctor || "").toLowerCase().includes(searchTerm) || // Include consultingDoctor
    (patient.department || "").toLowerCase().includes(searchTerm) ||
    (patient.disease || "").toLowerCase().includes(searchTerm)
  )
  .sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField] || "";
    const fieldB = b[sortField] || "";

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
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
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
                  <a href="index-2.html">Home</a>
                </li>
                <li className="breadcrumb-item text-primary" aria-current="page">
                  Appointments List
                </li>
              </ol>
            </div>
            <div className="app-body">
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title">Appointments List</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3 " style={{width: "35%"}}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by name, doctor, department, or disease"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="table-responsive">
                        <table id="appointmentsGrid" className="table m-0 align-middle">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th onClick={() => handleSort("patientName")}>
                                Patient Name {getSortIcon("patientName")}
                              </th>
                              <th onClick={() => handleSort("age")}>
                                Age {getSortIcon("age")}
                              </th>
                              <th onClick={() => handleSort("consultingDoctor")}>
                                Consulting Doctor {getSortIcon("consultingDoctor")}
                              </th>
                              <th onClick={() => handleSort("department")}>
                                Department {getSortIcon("department")}
                              </th>
                              <th onClick={() => handleSort("date")}>
                                Date {getSortIcon("date")}
                              </th>
                              <th onClick={() => handleSort("time")}>
                                Time {getSortIcon("time")}
                              </th>
                              <th onClick={() => handleSort("disease")}>
                                Disease {getSortIcon("disease")}
                              </th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPatients.map((patient, index) => (
                              <tr key={patient._id}>
                                <td>{index + 1}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.age}</td>
                                <td>{patient.consultingDoctor}</td>
                                <td>{patient.department}</td>
                                <td>{patient.date}</td>
                                <td>{patient.time}</td>
                                <td>{patient.disease}</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button className="btn btn-success btn-sm">
                                      <i className="ri-checkbox-circle-line"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm">
                                      <i className="ri-close-circle-line"></i>
                                    </button>
                                    <a href="/admin-edit-appointment" className="btn btn-outline-success btn-sm">
                                      <i className="ri-edit-box-line"></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {loading && <Spin />}
                        {!loading && filteredPatients.length === 0 && <p>No appointments found.</p>}
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

export default AdminAppointmentList;



// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";
// import axios from "axios";
// import { Spin, message } from "antd";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// const AdminAppointmentList =()=>{
//     const [loading, setLoading] = useState(false);
//     const [patients, setPatients] = useState([]);
//     const [selectedPatientId, setSelectedPatientId] = useState(null);
  
//     const token = localStorage.getItem("token");
  
//     const [messageApi, contextHolder] = message.useMessage();
  
//     const success = (message) => {
//       messageApi.open({
//         type: "success",
//         content: message,
//       });
//     };
  
//     const error = (message) => {
//       messageApi.open({
//         type: "error",
//         content: message,
//       });
//     };
  
//     const fetchPatients = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/patient/get-patient`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setPatients(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         error(err.message);
//         setLoading(false);
//       }
//     };
  
//     const handleDeletePatient = async () => {
//       setLoading(true);
//       try {
//         const result = await axios.delete(
//           `${
//             import.meta.env.VITE_API_URL
//           }/patient/delete-patient/${selectedPatientId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const { message } = result.data;
//         success(message);
//         setPatients((prev) =>
//           prev.filter((patient) => patient._id !== selectedPatientId)
//         );
//         setSelectedPatientId(null);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         error(err.message);
//       }
//     };
  
//     useEffect(() => {
//       fetchPatients();
//     }, [0]);


  

//     return <>

//      <div className="page-wrapper">
//         <Topbar />
//         <div className="main-container">
//           <Sidebar />
//           <div class="app-container">


// <div class="app-hero-header d-flex align-items-center">


//   <ol class="breadcrumb">
//     <li class="breadcrumb-item">
//       <i class="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
//       <a href="index-2.html">Home</a>
//     </li>
//     <li class="breadcrumb-item text-primary" aria-current="page">
//       Appointments List
//     </li>
//   </ol>

//   <div class="ms-auto d-lg-flex d-none flex-row">
//     <div class="d-flex flex-row gap-1 day-sorting">
//       <button class="btn btn-sm btn-primary">Today</button>
//       <button class="btn btn-sm">7d</button>
//       <button class="btn btn-sm">2w</button>
//       <button class="btn btn-sm">1m</button>
//       <button class="btn btn-sm">3m</button>
//       <button class="btn btn-sm">6m</button>
//       <button class="btn btn-sm">1y</button>
//     </div>
//   </div>


// </div>

// <div class="app-body">

 
//   <div class="row gx-3">
//     <div class="col-sm-12">
//       <div class="card">
//         <div class="card-header d-flex align-items-center justify-content-between">
//           <h5 class="card-title">Applointments List</h5>
//           <a href="/admin-book-appointment" class="btn btn-primary ms-auto">Book Appointment</a>
//         </div>
//         <div class="card-body">

         
//           <div class="table-responsive">
//             <table id="appointmentsGrid" class="table m-0 align-middle">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Patient Name</th>
//                   <th>Age</th>
//                   <th>Consulting Doctor</th>
//                   <th>Department</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Disease</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>001</td>
//                   <td>
//                     Deena Cooley
//                   </td>
//                   <td>65</td>
//                   <td>
//                     <img src="assets/images/user.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Vicki Walsh
//                   </td>
//                   <td>Surgeon</td>
//                   <td>05/23/2024</td>
//                   <td>9:30AM</td>
//                   <td>Diabeties</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="top"
//                         data-bs-title="Accepted">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject" disabled>
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>002</td>
//                   <td>
//                     Jerry Wilcox
//                   </td>
//                   <td>73</td>
//                   <td>
//                     <img src="assets/images/user1.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> April Gallegos
//                   </td>
//                   <td>Gynecologist</td>
//                   <td>05/23/2024</td>
//                   <td>9:45AM</td>
//                   <td>Fever</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept" disabled>
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top"
//                         data-bs-title="Rejected">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>003</td>
//                   <td>
//                     Eduardo Kramer
//                   </td>
//                   <td>84</td>
//                   <td>
//                     <img src="assets/images/user2.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Basil Frost
//                   </td>
//                   <td>Psychiatrists</td>
//                   <td>05/23/2024</td>
//                   <td>10:00AM</td>
//                   <td>Cold</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>004</td>
//                   <td>
//                     Jason Compton
//                   </td>
//                   <td>56</td>
//                   <td>
//                     <img src="assets/images/user4.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Nannie Guerrero
//                   </td>
//                   <td>Urologist</td>
//                   <td>05/23/2024</td>
//                   <td>10:15AM</td>
//                   <td>Prostate</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>005</td>
//                   <td>
//                     Emmitt Bryan
//                   </td>
//                   <td>49</td>
//                   <td>
//                     <img src="assets/images/user5.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Daren Andrade
//                   </td>
//                   <td>Cardiology</td>
//                   <td>05/23/2024</td>
//                   <td>10:30AM</td>
//                   <td>Asthma</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>006</td>
//                   <td>
//                     Truman Miles
//                   </td>
//                   <td>90</td>
//                   <td>
//                     <img src="assets/images/user2.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Colleen Murillo
//                   </td>
//                   <td>Paediatrician</td>
//                   <td>05/23/2024</td>
//                   <td>10:45AM</td>
//                   <td>Cholera</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>007</td>
//                   <td>
//                     Dillon Stokes
//                   </td>
//                   <td>36</td>
//                   <td>
//                     <img src="assets/images/user3.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Josiah Hobbs
//                   </td>
//                   <td>Gynecologist</td>
//                   <td>05/23/2024</td>
//                   <td>11:00AM</td>
//                   <td>Heart</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>008</td>
//                   <td>
//                     Harris Peters
//                   </td>
//                   <td>79</td>
//                   <td>
//                     <img src="assets/images/user4.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Wilma Dickson
//                   </td>
//                   <td>Urologist</td>
//                   <td>05/23/2024</td>
//                   <td>11:15AM</td>
//                   <td>Outbreaks</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>009</td>
//                   <td>
//                     Tomas Schultz
//                   </td>
//                   <td>79</td>
//                   <td>
//                     <img src="assets/images/user5.png" class="img-shadow img-2x rounded-5 me-1"
//                       alt="Hospital Admin Template"/> Monique Merritt
//                   </td>
//                   <td>Paediatrician</td>
//                   <td>05/23/2024</td>
//                   <td>11:30AM</td>
//                   <td>Fever</td>
//                   <td>
//                     <div class="d-inline-flex gap-1">
//                       <button class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Accept">
//                         <i class="ri-checkbox-circle-line"></i>
//                       </button>
//                       <button class="btn btn-outline-danger btn-sm" data-bs-toggle="tooltip"
//                         data-bs-placement="top" data-bs-title="Reject">
//                         <i class="ri-close-circle-line"></i>
//                       </button>
//                       <a href="/admin-edit-appointment" class="btn btn-outline-success btn-sm"
//                         data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Appointment">
//                         <i class="ri-edit-box-line"></i>
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>


//         </div>
//       </div>
//     </div>
//   </div>


// </div>




// </div>
//         </div>
//       </div>
//     </>
// }
// export default AdminAppointmentList