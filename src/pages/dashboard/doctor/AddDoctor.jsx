// import { useState, useEffect } from "react"
// import Sidebar from "../../../components/Sidebar"
// import Topbar from "../../../components/Topbar"
// import { postAPI, getAPI } from "../../../API/commonAPI";
// import { notification } from "antd";
// import moment from "moment-timezone";

// import DeleteIcon from "@mui/icons-material/Delete";



// import { Grid, Button, Select, MenuItem, Paper, TextField, Typography, Switch, Box } from "@mui/material";

// const AddDoctor = () => {
 

//   const [data, setData] = useState([]);
//   const [api, contextHolder] = notification.useNotification();
//   const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
//   const [slotDuration, setSlotDuration] = useState(30);

//   const [schedule, setSchedule] = useState({
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//     Saturday: [],
//     Sunday: [],
//   });

//   const [doctor, setDoctor] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     email: "",
//     mobile: "",
//     username: "",
//     password: "",
//     specialization: "",
//     experience: "",
//     qualifications: "",
//     license: "",
//     about: "",
//     status: "inactive",
//     timeZone: timeZone,
//     slotDuration: slotDuration,
//     schedule: {},
//   });



//   const detectTimeZone = () => {
//     const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
//     setTimeZone(detectedTimeZone);
//   };


//   const dayNameMapping = {
//     Monday: "Monday",
//     Tuesday: "Tuesday",
//     Wednesday: "Wednesday",
//     Thursday: "Thursday",
//     Friday: "Friday",
//     Saturday: "Saturday",
//     Sunday: "Sunday",
//   };

//   const fetchDepartment = async () => {
//     const result = await getAPI("department/all-department");
//     setData(result);
//     console.log('result',result)
//   };




//   useEffect(() => {
//     fetchDepartment();
//     setDoctor((prev) => ({ ...prev, email: "" }));
//   }, []);

//   const openNotification = (status, title, desc) => {
//     console.log(title);
//     if (status == true) {
//       api.success({
//         message: title,
//         description: desc,
//       });
//     } else {
//       api.error({
//         message: title,
//         description: desc,
//       });
//     }
//   };

  


//   const convertTo24Hour = (time) => {
//     const match = time.match(/^(\d+)(AM|PM)$/);
//     if (!match) return time; // Return as is if the format is wrong
//     let [_, hour, period] = match;
//     hour = parseInt(hour, 10);
  
//     if (period === "PM" && hour !== 12) {
//       hour += 12;
//     } else if (period === "AM" && hour === 12) {
//       hour = 0;
//     }
  
//     return hour.toString().padStart(2, "0") + ":00"; // Ensure HH:mm format
//   };
  
//   const formChange = (event) => {
//     const { name, value } = event.target;
  
//     if (name.includes("1") || name.includes("2")) {
//       const [day, time] = name.match(/(\w+)(\d)/).slice(1);
//       setDoctor((prev) => ({
//         ...prev,
//         schedule: {
//           ...prev.schedule,
//           [day]: {
//             ...prev.schedule[day],
//             [time === "1" ? "start" : "end"]: convertTo24Hour(value),
//           },
//         },
//       }));
//     } else {
//       setDoctor((prev) => ({ ...prev, [name]: value }));
//     }
//   };
  

//   const doctorSubmit = async (event) => {
//     event.preventDefault();
//     const formattedSchedule = Object.keys(schedule).reduce((acc, day) => {
//       acc[day.slice(0, 3).toLowerCase()] = schedule[day];
//       return acc;
//     }, {});

//     const doctorData = { ...doctor, schedule: formattedSchedule, timeZone, slotDuration };
//     const result = await postAPI("admin/add-doctor", doctorData);
//     const { status, message, desc } = result;
//     api[status ? "success" : "error"]({ message, description: desc });
//   };


//   const handleScheduleChange = (day, index, field, value) => {
//     setSchedule((prev) => {
//       const newDaySchedule = [...prev[day]];
//       newDaySchedule[index] = { ...newDaySchedule[index], [field]: value };
//       return { ...prev, [day]: newDaySchedule };
//     });
//   };


//   const handleAddSlot = (day) => {
//     setSchedule((prev) => ({
//       ...prev,
//       [day]: [...prev[day], { start: "", end: "" }],
//     }));
//   };

//   const handleRemoveSlot = (day, index) => {
//     setSchedule((prev) => {
//       const newDaySchedule = [...prev[day]];
//       newDaySchedule.splice(index, 1);
//       return { ...prev, [day]: newDaySchedule };
//     });
//   };


//   return (
//     <>
//       {contextHolder}
//       <div className="page-wrapper">
//         {/* App header starts */}
//         <Topbar />

//         {/* App header ends */}
//         {/* Main container starts */}
//         <div className="main-container">
//           {/* Sidebar wrapper starts */}
//           <Sidebar />
//           {/* Sidebar wrapper ends */}
//           {/* App container starts */}
//           <div className="app-container">
//             {/* App hero header starts */}
//             <div className="app-hero-header d-flex align-items-center">
//               {/* Breadcrumb starts */}
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                   <a href="index-2.html">Home</a>
//                 </li>
//                 <li
//                   className="breadcrumb-item text-primary"
//                   aria-current="page"
//                 >
//                   Add Doctor
//                 </li>
//               </ol>
//               {/* Breadcrumb ends */}
//               {/* Sales stats starts */}
//               <div className="ms-auto d-lg-flex d-none flex-row">
//                 <div className="d-flex flex-row gap-1 day-sorting">
//                   <button className="btn btn-sm btn-primary">Today</button>
//                   <button className="btn btn-sm">7d</button>
//                   <button className="btn btn-sm">2w</button>
//                   <button className="btn btn-sm">1m</button>
//                   <button className="btn btn-sm">3m</button>
//                   <button className="btn btn-sm">6m</button>
//                   <button className="btn btn-sm">1y</button>
//                 </div>
//               </div>
//               {/* Sales stats ends */}
//             </div>
//             {/* App Hero header ends */}
//             {/* App body starts */}
//             <div className="app-body">
//               {/* Row starts */}
//               <div className="row gx-3">
//                 <div className="col-xl-12">
//                   <div className="card">
//                     <div className="card-body">
//                       <form onSubmit={doctorSubmit}>
//                         {/* Custom tabs starts */}
//                         <div className="custom-tabs-container">
//                           {/* Nav tabs starts */}
//                           <ul
//                             className="nav nav-tabs"
//                             id="customTab2"
//                             role="tablist"
//                           >
//                             <li className="nav-item" role="presentation">
//                               <a
//                                 className="nav-link active"
//                                 id="tab-oneA"
//                                 data-bs-toggle="tab"
//                                 href="#oneA"
//                                 role="tab"
//                                 aria-controls="oneA"
//                                 aria-selected="true"
//                               >
//                                 <i className="ri-account-pin-circle-line" />
//                                 Personal Details
//                               </a>
//                             </li>
//                             <li className="nav-item" role="presentation">
//                               <a
//                                 className="nav-link"
//                                 id="tab-twoA"
//                                 data-bs-toggle="tab"
//                                 href="#twoA"
//                                 role="tab"
//                                 aria-controls="twoA"
//                                 aria-selected="false"
//                               >
//                                 <i className="ri-briefcase-4-line" />
//                                 Professional Information
//                               </a>
//                             </li>
//                             <li className="nav-item" role="presentation">
//                               <a
//                                 className="nav-link"
//                                 id="tab-threeA"
//                                 data-bs-toggle="tab"
//                                 href="#threeA"
//                                 role="tab"
//                                 aria-controls="threeA"
//                                 aria-selected="false"
//                               >
//                                 <i className="ri-calendar-check-line" />
//                                 Availability
//                               </a>
//                             </li>
//                             <li className="nav-item" role="presentation">
//                               <a
//                                 className="nav-link"
//                                 id="tab-fourA"
//                                 data-bs-toggle="tab"
//                                 href="#fourA"
//                                 role="tab"
//                                 aria-controls="fourA"
//                                 aria-selected="false"
//                               >
//                                 <i className="ri-lock-password-line" /> Account
//                                 Details
//                               </a>
//                             </li>
//                             <li className="nav-item" role="presentation">
//                               <a
//                                 className="nav-link"
//                                 id="tab-fiveA"
//                                 data-bs-toggle="tab"
//                                 href="#fiveA"
//                                 role="tab"
//                                 aria-controls="fiveA"
//                                 aria-selected="false"
//                               >
//                                 <i className="ri-account-pin-circle-line" />
//                                 About Me
//                               </a>
//                             </li>
//                           </ul>
//                           {/* Nav tabs ends */}
//                           {/* Tab content starts */}
//                           <div className="tab-content h-350">
//                             <div
//                               className="tab-pane fade show active"
//                               id="oneA"
//                               role="tabpanel"
//                             >
//                               {/* Row starts */}
//                               <div className="row gx-3">
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a1">
//                                       First Name{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-account-circle-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="firstName"
//                                         id="a1"
//                                         placeholder="Enter First Name"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a2">
//                                       Last Name{" "}
//                                       <span
//                                         className="text-danger"
//                                         name="firstName"
//                                       >
//                                         *
//                                       </span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-account-circle-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="lastName"
//                                         id="a2"
//                                         placeholder="Enter Last Name"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a3">
//                                       Age <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-flower-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         placeholder="Type Number"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="age"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label
//                                       className="form-label"
//                                       htmlFor="selectGender1"
//                                     >
//                                       Gender
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-flower-line" />
//                                       </span>
//                                       <select
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="gender"
//                                         id="a3"
//                                       >
//                                         <option value="">Select Gender</option>
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a5">
//                                       Email ID{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-mail-open-line" />
//                                       </span>
//                                       <input
//                                       type="email"
//                                       className="form-control"
//                                       id="a5"
//                                       placeholder="Enter Email ID"
//                                       name="email"
//                                       value={doctor.email} // Ensures the email field starts blank
//                                       onChange={formChange}
//                                       autoComplete="new-password" // Helps prevent autofill issues
//                                     />

//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a6">
//                                       Mobile Number{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-phone-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         id="a6"
//                                         placeholder="Enter Mobile Number"
//                                         name="mobile"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a6">
//                                       Profile Photo
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       {/* <span className="input-group-text">
//                                       <i className="ri-phone-line" />
//                                     </span> */}
//                                       <input
//                                         type="file"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="image"
//                                         id="a6"
//                                         placeholder="Enter Mobile Number"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               {/* Row ends */}
//                             </div>
//                             <div
//                               className="tab-pane fade"
//                               id="twoA"
//                               role="tabpanel"
//                             >
//                               {/* Row starts */}
//                               <div className="row gx-3">
//                                 {/* <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a3">
//                                       Specialization{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-flower-line" />
//                                       </span>
//                                       <select
//                                         className="form-select"
//                                         onChange={formChange}
//                                         id="a3"
//                                         name="specialization"
//                                       >
//                                         <option value={0}>
//                                           Select Specialization
//                                         </option>
//                                         <option value={1}>1</option>
//                                         <option value={2}>2</option>
//                                         <option value={3}>3</option>
//                                         <option value={4}>4</option>
//                                         <option value={5}>5</option>
//                                         <option value={6}>6</option>
//                                         <option value={7}>7</option>
//                                         <option value={8}>8</option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 </div> */}

//                                 {/* Specification Dropdown */}
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label
//                                       className="form-label"
//                                       htmlFor="specialization"
//                                     >
//                                       Select Specification
//                                     </label>
//                                     <select
//                                       className="form-select"
//                                       id="specialization"
//                                       name="specialization"
//                                       onChange={formChange}
//                                     >
//                                       <option value="">
//                                         Select Department
//                                       </option>
//                                       {data?.departments?.map((department) => (
//                                         <option
//                                           key={department._id}
//                                           value={department._id}
//                                         >
//                                           {department.department}
//                                         </option>
//                                       ))}
//                                     </select>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a3">
//                                       Experience{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-flower-line" />
//                                       </span>
//                                       <select
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="experience"
//                                         id="a3"
//                                       >
//                                         <option value={0}>
//                                           Years of Experience
//                                         </option>
//                                         <option value={1}>1</option>
//                                         <option value={2}>2</option>
//                                         <option value={3}>3</option>
//                                         <option value={4}>4</option>
//                                         <option value={5}>5</option>
//                                         <option value={6}>6</option>
//                                         <option value={7}>7</option>
//                                         <option value={8}>8</option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a3">
//                                       Qualifications{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-flower-line" />
//                                       </span>
//                                       <select
//                                         className="form-select"
//                                         onChange={formChange}
//                                         id="a3"
//                                         name="qualifications"
//                                       >
//                                         <option value={0}>
//                                           Select Qualifications{" "}
//                                         </option>
//                                         <option value="MBBS">MBBS</option>
//                                         <option value="MD">MD</option>
//                                         <option value="DNB">DNB</option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="a1">
//                                       License/Registration Number
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-account-circle-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         id="a1"
//                                         placeholder="Type Registration Number"
//                                         name="license"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 {/* <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                 <div className="mb-3">
//                                   <label className="form-label" htmlFor="a2">
//                                     Upload Medical License
//                                     <span className="text-danger">*</span>
//                                   </label>
//                                   <div className="input-group">
//                                     <input
//                                       type="file"
//                                       className="form-select" onChange={formChange}
//                                       id="a2"
//                                     />
//                                   </div>
//                                 </div>
//                               </div> */}
//                               </div>

//                               {/* Row ends */}
//                             </div>
//                             <div
//                               className="tab-pane fade"
//                               id="threeA"
//                               role="tabpanel"
//                             >
//                               {/* Row starts */}
//                               <Grid container spacing={3}>
//       <Grid item xs={12} sx={{ display: "flex", gap: "20px",alignItems: "center", marginTop: "20px" }}>
//         <Button onClick={() => setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)} variant="contained" sx={{ width: "180px",height:"40px", background: "#116af0", fontSize: ".8rem" }}>
//           Detect Time Zone
//         </Button>

//         <Select style={{ width: "30%", marginTop: "5px",height:"40px" }} value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
//           {moment.tz.names().map((tz) => (
//             <MenuItem key={tz} value={tz}>{tz}</MenuItem>
//           ))}
//         </Select>

//         <Typography variant="body1" sx={{ marginLeft: "40px", marginTop: "5px", fontSize: "1rem" }}>Slot Duration:</Typography>
//         <Select style={{ width: "10%",height:"36px" }} value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)}>
//           {[15, 30, 45, 60].map((duration) => (
//             <MenuItem key={duration} value={duration}>{duration} min</MenuItem>
//           ))}
//         </Select>
//       </Grid>

//       {Object.keys(schedule).map((day) => (
//         <Grid item xs={12} md={6} key={day} sx={{ zoom: "0.9" }}>
//           <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h7">{day}</Typography>
//               <Button onClick={() => handleAddSlot(day)}>➕</Button>
//             </Box>
//             {schedule[day]?.map((slot, index) => (
//               <Box key={index} mt={2} display="flex" alignItems="center" gap={2}>
//                 <TextField label="Start Time" type="time" value={slot.start} onChange={(e) => handleScheduleChange(day, index, "start", e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
//                 <Typography variant="h6">--</Typography>
//                 <TextField label="End Time" type="time" value={slot.end} onChange={(e) => handleScheduleChange(day, index, "end", e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
//                 <Button onClick={() => handleRemoveSlot(day, index)}>
//                   <DeleteIcon color="error" />
//                 </Button>
//               </Box>
//             ))}
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//                               {/* Row ends */}
//                             </div>
//                             <div
//                               className="tab-pane fade"
//                               id="fourA"
//                               role="tabpanel"
//                             >
//                               {/* Row starts */}
//                               <div className="row gx-3">
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="u1">
//                                       User Name
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-account-pin-circle-line" />
//                                       </span>
//                                       <input
//                                         type="text"
//                                         id="u1"
//                                         placeholder="Enter username"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         name="username"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="u2">
//                                       Password
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-lock-password-line" />
//                                       </span>
//                                       <input
//                                         type="password"
//                                         id="u2"
//                                         name="password"
//                                         className="form-select"
//                                         onChange={formChange}
//                                         placeholder="Password must be 8-20 characters long."
//                                       />
//                                       <button
//                                         className="btn btn-outline-secondary"
//                                         type="button"
//                                       >
//                                         <i className="ri-eye-line" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="u3">
//                                       Confirm Password
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-lock-password-line" />
//                                       </span>
//                                       <input
//                                         type="password"
//                                         id="u3"
//                                         name="confirmPassword"
//                                         placeholder="Confirm new password"
//                                         className="form-select"
//                                         onChange={formChange}
//                                       />
//                                       <button
//                                         className="btn btn-outline-secondary"
//                                         type="button"
//                                       >
//                                         <i className="ri-eye-off-line" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="u3">
//                                       Status
//                                     </label>
//                                     <div className="input-group">
//                                       <span className="input-group-text">
//                                         <i className="ri-lock-password-line" />
//                                       </span>
//                                       <select
//                                         className="form-select"
//                                         name="status"
//                                         onChange={formChange}
//                                       >
//                                         <option value={0}>Select Status</option>
//                                         <option value={"active"}>Active</option>
//                                         <option value={"inactive"}>
//                                           Inactive
//                                         </option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               {/* Row ends */}
//                             </div>
//                             <div
//                               className="tab-pane fade"
//                               id="fiveA"
//                               role="tabpanel"
//                             >
//                               {/* Row starts */}
//                               <div className="row gx-3">
//                                 <div className="col-xxl-12 col-lg-12 col-sm-12">
//                                   <div className="mb-3">
//                                     <label className="form-label" htmlFor="u1">
//                                       Doctor Description
//                                     </label>
//                                     <div className="">
//                                       {/* <span className="input-group-text">
//                                         <i className="ri-account-pin-circle-line" />
//                                       </span> */}
//                                       <textarea
//                                         type="text"
//                                         id="u1"
//                                         placeholder="Write here doctor description"
//                                         className="form-select"
//                                         name="about"
//                                         rows={10}
//                                         onChange={formChange}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               {/* Row ends */}
//                             </div>
//                           </div>
//                           {/* Tab content ends */}
//                         </div>
//                         {/* Custom tabs ends */}
//                         {/* Card acrions starts */}
//                         <div className="d-flex gap-2 justify-content-end mt-4">
//                           <a href="#" className="btn btn-outline-secondary">
//                             Cancel
//                           </a>

//                           <button type="submit" className="btn btn-primary">
//                             Create Doctor Profile
//                           </button>
//                         </div>
//                       </form>

//                       {/* Card acrions ends */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Row ends */}
//             </div>
//             {/* App body ends */}
//             {/* App footer starts */}

//             {/* App footer ends */}
//           </div>
//           {/* App container ends */}
//         </div>
//         {/* Main container ends */}
//       </div>
//     </>
//   );
// };

// export default AddDoctor;

import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { postAPI, getAPI } from "../../../API/commonAPI";
import { notification } from "antd";
import moment from "moment-timezone";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Button, Select, MenuItem, Paper, TextField, Typography, Box } from "@mui/material";

const AddDoctor = () => {
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [slotDuration, setSlotDuration] = useState(30);
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    specialization: "",
    experience: "",
    qualifications: "",
    license: "",
    about: "",
    status: "inactive",
    timeZone: timeZone, // Initial value
    slotDuration: slotDuration, // Initial value
    schedule: {},
  });

  const detectTimeZone = () => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(detectedTimeZone);
    setDoctor((prev) => ({ ...prev, timeZone: detectedTimeZone })); // Update doctor state
  };

  const fetchDepartment = async () => {
    const result = await getAPI("department/all-department");
    setData(result);
    console.log("result", result);
  };

  useEffect(() => {
    fetchDepartment();
    setDoctor((prev) => ({ ...prev, email: "" }));
  }, []);

  const openNotification = (status, title, desc) => {
    if (status === true) {
      api.success({ message: title, description: desc });
    } else {
      api.error({ message: title, description: desc });
    }
  };

  const formChange = (event) => {
    const { name, value } = event.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const doctorSubmit = async (event) => {
    event.preventDefault();

    const formattedSchedule = Object.keys(schedule).reduce((acc, day) => {
      acc[day.slice(0, 3).toLowerCase()] = schedule[day];
      return acc;
    }, {});

    // Update doctor state with the latest timeZone and slotDuration
    const updatedDoctor = {
      ...doctor,
      schedule: formattedSchedule,
      timeZone: timeZone, // Use the latest timeZone
      slotDuration: slotDuration, // Use the latest slotDuration
    };

    // Use FormData to send data
    const formData = new FormData();
    Object.keys(updatedDoctor).forEach((key) => {
      if (key === "schedule") {
        formData.append(key, JSON.stringify(updatedDoctor[key]));
      } else {
        formData.append(key, updatedDoctor[key]);
      }
    });
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    // Debug: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const result = await postAPI("admin/add-doctor", formData);
      const { status, message, desc } = result;
      api[status ? "success" : "error"]({ message, description: desc });
    } catch (error) {
      api.error({
        message: "Failed to create doctor",
        description: "Oops! Something went wrong.",
      });
    }
  };

  const handleScheduleChange = (day, index, field, value) => {
    setSchedule((prev) => {
      const newDaySchedule = [...prev[day]];
      newDaySchedule[index] = { ...newDaySchedule[index], [field]: value };
      return { ...prev, [day]: newDaySchedule };
    });
  };

  const handleAddSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], { start: "", end: "" }],
    }));
  };

  const handleRemoveSlot = (day, index) => {
    setSchedule((prev) => {
      const newDaySchedule = [...prev[day]];
      newDaySchedule.splice(index, 1);
      return { ...prev, [day]: newDaySchedule };
    });
  };

  const handleSlotDurationChange = (e) => {
    setSlotDuration(e.target.value);
    setDoctor((prev) => ({ ...prev, slotDuration: e.target.value })); // Update doctor state
  };

  const handleTimeZoneChange = (e) => {
    setTimeZone(e.target.value);
    setDoctor((prev) => ({ ...prev, timeZone: e.target.value })); // Update doctor state
  };

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
                  <a href="index-2.html">Home</a>
                </li>
                <li className="breadcrumb-item text-primary" aria-current="page">
                  Add Doctor
                </li>
              </ol>
              <div className="ms-auto d-lg-flex d-none flex-row">
                <div className="d-flex flex-row gap-1 day-sorting">
                  <button className="btn btn-sm btn-primary">Today</button>
                  <button className="btn btn-sm">7d</button>
                  <button className="btn btn-sm">2w</button>
                  <button className="btn btn-sm">1m</button>
                  <button className="btn btn-sm">3m</button>
                  <button className="btn btn-sm">6m</button>
                  <button className="btn btn-sm">1y</button>
                </div>
              </div>
            </div>
            <div className="app-body">
              <div className="row gx-3">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={doctorSubmit}>
                        <div className="custom-tabs-container">
                          <ul className="nav nav-tabs" id="customTab2" role="tablist">
                            <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="tab-oneA" data-bs-toggle="tab" href="#oneA" role="tab" aria-controls="oneA" aria-selected="true">
                                <i className="ri-account-pin-circle-line" /> Personal Details
                              </a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="tab-twoA" data-bs-toggle="tab" href="#twoA" role="tab" aria-controls="twoA" aria-selected="false">
                                <i className="ri-briefcase-4-line" /> Professional Information
                              </a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="tab-threeA" data-bs-toggle="tab" href="#threeA" role="tab" aria-controls="threeA" aria-selected="false">
                                <i className="ri-calendar-check-line" /> Availability
                              </a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="tab-fourA" data-bs-toggle="tab" href="#fourA" role="tab" aria-controls="fourA" aria-selected="false">
                                <i className="ri-lock-password-line" /> Account Details
                              </a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="tab-fiveA" data-bs-toggle="tab" href="#fiveA" role="tab" aria-controls="fiveA" aria-selected="false">
                                <i className="ri-account-pin-circle-line" /> About Me
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content h-350">
                            <div className="tab-pane fade show active" id="oneA" role="tabpanel">
                              <div className="row gx-3">
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a1">
                                      First Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-account-circle-line" />
                                      </span>
                                      <input type="text" className="form-select" onChange={formChange} name="firstName" id="a1" placeholder="Enter First Name" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a2">
                                      Last Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-account-circle-line" />
                                      </span>
                                      <input type="text" className="form-select" onChange={formChange} name="lastName" id="a2" placeholder="Enter Last Name" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a3">
                                      Age <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-flower-line" />
                                      </span>
                                      <input type="text" placeholder="Type Number" className="form-select" onChange={formChange} name="age" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="selectGender1">
                                      Gender <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-flower-line" />
                                      </span>
                                      <select className="form-select" onChange={formChange} name="gender" id="a3">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a5">
                                      Email ID <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-mail-open-line" />
                                      </span>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="a5"
                                        placeholder="Enter Email ID"
                                        name="email"
                                        value={doctor.email}
                                        onChange={formChange}
                                        autoComplete="new-password"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a6">
                                      Mobile Number <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-phone-line" />
                                      </span>
                                      <input type="text" className="form-select" onChange={formChange} id="a6" placeholder="Enter Mobile Number" name="mobile" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a6">
                                      Profile Photo <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <input type="file" className="form-select" onChange={handleFileChange} name="profilePhoto" id="a6" accept="image/jpeg,image/jpg,image/png" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane fade" id="twoA" role="tabpanel">
                              <div className="row gx-3">
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="specialization">
                                      Select Specification
                                    </label>
                                    <select className="form-select" id="specialization" name="specialization" onChange={formChange}>
                                      <option value="">Select Department</option>
                                      {data?.departments?.map((department) => (
                                        <option key={department._id} value={department._id}>
                                          {department.department}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a3">
                                      Experience <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-flower-line" />
                                      </span>
                                      <select className="form-select" onChange={formChange} name="experience" id="a3">
                                        <option value={0}>Years of Experience</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a3">
                                      Qualifications <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-flower-line" />
                                      </span>
                                      <select className="form-select" onChange={formChange} id="a3" name="qualifications">
                                        <option value={0}>Select Qualifications</option>
                                        <option value="MBBS">MBBS</option>
                                        <option value="MD">MD</option>
                                        <option value="DNB">DNB</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="a1">
                                      License/Registration Number <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-account-circle-line" />
                                      </span>
                                      <input type="text" className="form-select" onChange={formChange} id="a1" placeholder="Type Registration Number" name="license" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane fade" id="threeA" role="tabpanel">
                              <Grid container spacing={3}>
                                <Grid item xs={12} sx={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "20px" }}>
                                  <Button
                                    onClick={detectTimeZone}
                                    variant="contained"
                                    sx={{ width: "180px", height: "40px", background: "#116af0", fontSize: ".8rem" }}
                                  >
                                    Detect Time Zone
                                  </Button>
                                  <Select style={{ width: "30%", marginTop: "5px", height: "40px" }} value={timeZone} onChange={handleTimeZoneChange}>
                                    {moment.tz.names().map((tz) => (
                                      <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                                    ))}
                                  </Select>
                                  <Typography variant="body1" sx={{ marginLeft: "40px", marginTop: "5px", fontSize: "1rem" }}>
                                    Slot Duration:
                                  </Typography>
                                  <Select style={{ width: "10%", height: "36px" }} value={slotDuration} onChange={handleSlotDurationChange}>
                                    {[15, 30, 45, 60].map((duration) => (
                                      <MenuItem key={duration} value={duration}>{duration} min</MenuItem>
                                    ))}
                                  </Select>
                                </Grid>
                                {Object.keys(schedule).map((day) => (
                                  <Grid item xs={12} md={6} key={day} sx={{ zoom: "0.9" }}>
                                    <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h7">{day}</Typography>
                                        <Button onClick={() => handleAddSlot(day)}>➕</Button>
                                      </Box>
                                      {schedule[day]?.map((slot, index) => (
                                        <Box key={index} mt={2} display="flex" alignItems="center" gap={2}>
                                          <TextField
                                            label="Start Time"
                                            type="time"
                                            value={slot.start}
                                            onChange={(e) => handleScheduleChange(day, index, "start", e.target.value)}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          <Typography variant="h6">--</Typography>
                                          <TextField
                                            label="End Time"
                                            type="time"
                                            value={slot.end}
                                            onChange={(e) => handleScheduleChange(day, index, "end", e.target.value)}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          <Button onClick={() => handleRemoveSlot(day, index)}>
                                            <DeleteIcon color="error" />
                                          </Button>
                                        </Box>
                                      ))}
                                    </Paper>
                                  </Grid>
                                ))}
                              </Grid>
                            </div>
                            <div className="tab-pane fade" id="fourA" role="tabpanel">
                              <div className="row gx-3">
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="u1">
                                      User Name
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-account-pin-circle-line" />
                                      </span>
                                      <input type="text" id="u1" placeholder="Enter username" className="form-select" onChange={formChange} name="username" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="u2">
                                      Password
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-lock-password-line" />
                                      </span>
                                      <input
                                        type="password"
                                        id="u2"
                                        name="password"
                                        className="form-select"
                                        onChange={formChange}
                                        placeholder="Password must be 8-20 characters long."
                                      />
                                      <button className="btn btn-outline-secondary" type="button">
                                        <i className="ri-eye-line" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="u3">
                                      Confirm Password
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-lock-password-line" />
                                      </span>
                                      <input type="password" id="u3" name="confirmPassword" placeholder="Confirm new password" className="form-select" onChange={formChange} />
                                      <button className="btn btn-outline-secondary" type="button">
                                        <i className="ri-eye-off-line" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-3 col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="u3">
                                      Status
                                    </label>
                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="ri-lock-password-line" />
                                      </span>
                                      <select className="form-select" name="status" onChange={formChange}>
                                        <option value={0}>Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane fade" id="fiveA" role="tabpanel">
                              <div className="row gx-3">
                                <div className="col-xxl-12 col-lg-12 col-sm-12">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="u1">
                                      Doctor Description
                                    </label>
                                    <div className="">
                                      <textarea
                                        type="text"
                                        id="u1"
                                        placeholder="Write here doctor description"
                                        className="form-select"
                                        name="about"
                                        rows={10}
                                        onChange={formChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-end mt-4">
                          <a href="#" className="btn btn-outline-secondary">
                            Cancel
                          </a>
                          <button type="submit" className="btn btn-primary">
                            Create Doctor Profile
                          </button>
                        </div>
                      </form>
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

export default AddDoctor;
