
import { useState, useEffect } from "react";
import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";
import { postAPI, getAPI } from "../../../API/commonAPI";
import { notification, Select, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { Switch, TextField, Box, Typography, Paper, Grid, Button,MenuItem  } from "@mui/material";

// import { TimePicker, Switch, Card } from "antd";

import {  DatePicker } from "antd";
// import moment from "moment"; // Ant Design uses moment.js for time formatting

import moment from "moment-timezone";

const ManageAvailbility = () => {
 const { id } = useParams();
  const token = localStorage.getItem("token");
  const [api, contextHolder] = notification.useNotification();

  const [doctorData, setDoctorData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [slotDuration, setSlotDuration] = useState(30);
  const [schedule, setSchedule] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null); // New state for file input
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  const [formData, setFormData] = useState({
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
    timeZone: timeZone,
    schedule: {},
  });

  const dayNameMapping = {
    sun: "Sunday",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
  };

  useEffect(() => {
    fetchDoctorDetails();
    fetchDepartments();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-single-doctor/${id}`);
      if (response.data.status) {
        const doctor = response.data.doctor;
        setDoctorData(doctor);
        setTimeZone(doctor.timeZone || "UTC");
        setSlotDuration(doctor.slotDuration || 30);

        const updatedSchedule = {};
        Object.keys(doctor.schedule || {}).forEach((day) => {
          updatedSchedule[day] = Array.isArray(doctor.schedule[day])
            ? doctor.schedule[day]
            : doctor.schedule[day]?.start && doctor.schedule[day]?.end
            ? [{ start: doctor.schedule[day].start, end: doctor.schedule[day].end }]
            : [];
        });
        setSchedule(updatedSchedule);

        setFormData({
          ...doctor,
          specialization: Array.isArray(doctor.specialization)
            ? doctor.specialization.map((spec) => spec._id)
            : [doctor.specialization?._id || doctor.specialization],
        });

        // Set initial preview image if profilePhoto exists
        if (doctor.profilePhoto) {
          setPreviewImage(`${import.meta.env.VITE_API_URL}${doctor.profilePhoto}`);
        }
      }
    } catch (error) {
      console.error("Error fetching doctor details", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/department/all-department`);
      if (result.data.status) {
        setDepartments(result.data.departments);
      }
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const detectTimeZone = () => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(detectedTimeZone);
    setFormData((prev) => ({ ...prev, timeZone: detectedTimeZone }));
  };

  const handleAddSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "", end: "" }],
    }));
  };

  const handleRemoveSlot = (day, index) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleScheduleChange = (day, index, field, value) => {
    setSchedule((prev) => {
      const updatedDaySchedule = [...(prev[day] || [])];
      const isDuplicate = updatedDaySchedule.some((slot, i) => i !== index && (slot.start === value || slot.end === value));
      if (isDuplicate) {
        notification.error({ message: "Error", description: "Duplicate time slot detected!" });
        return prev;
      }
      updatedDaySchedule[index][field] = value;
      return { ...prev, [day]: updatedDaySchedule };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Exclude timeZone and slotDuration from formData to avoid duplication
    Object.keys(formData).forEach((key) => {
      if (key === "schedule") {
        data.append(key, JSON.stringify(schedule));
      } else if (key === "specialization") {
        data.append(key, formData[key][0]); // Send single specialization ID
      } else if (key !== "timeZone" && key !== "slotDuration") { // Skip these fields
        data.append(key, formData[key]);
      }
    });
    
    // Append single values for timeZone and slotDuration
    data.append("timeZone", timeZone);
    data.append("slotDuration", slotDuration);
    if (profilePhoto) {
      data.append("profilePhoto", profilePhoto);
    }
  
    // Log FormData content for debugging
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/edit-doctor/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({ message: "Success", description: "Doctor updated successfully." });
    } catch (error) {
      console.error("Error updating doctor:", error.response?.data || error.message);
      notification.error({ message: "Update Failed", description: "Failed to update doctor profile." });
    }
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
                      <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item text-primary" aria-current="page">
                      Edit Doctor Profile
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
                      <div className="card" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            {/* Profile Photo Section */}
                            <div className="text-center mb-4">
                              <div style={{ position: "relative", display: "inline-block" }}>
                                {previewImage ? (
                                  <img
                                    src={previewImage}
                                    alt="Profile Preview"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      border: "3px solid #007bff",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      borderRadius: "50%",
                                      backgroundColor: "#e9ecef",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "50px",
                                      color: "#757575",
                                      border: "3px solid #007bff",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <i className="ri-user-line" />
                                  </div>
                                )}
                                <label
                                  htmlFor="profilePhoto"
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "10px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <i className="ri-camera-line" />
                                </label>
                                <input
                                  type="file"
                                  id="profilePhoto"
                                  name="profilePhoto"
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
    
                            {/* Tabs and Form Fields */}
                            <div className="custom-tabs-container">
                              <ul className="nav nav-tabs" id="customTab2" role="tablist">
                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link active"
                                    id="tab-oneA"
                                    data-bs-toggle="tab"
                                    href="#oneA"
                                    role="tab"
                                    aria-controls="oneA"
                                    aria-selected="true"
                                  >
                                    <i className="ri-briefcase-4-line"></i> Personal Details
                                  </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link"
                                    id="tab-threeA"
                                    data-bs-toggle="tab"
                                    href="#threeA"
                                    role="tab"
                                    aria-controls="threeA"
                                    aria-selected="false"
                                  >
                                    <i className="ri-calendar-check-line"></i> Availability
                                  </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link"
                                    id="tab-fourA"
                                    data-bs-toggle="tab"
                                    href="#fourA"
                                    role="tab"
                                    aria-controls="fourA"
                                    aria-selected="false"
                                  >
                                    <i className="ri-lock-password-line"></i> Account Details
                                  </a>
                                </li>
                              </ul>
                              <div className="tab-content">
                                <div className="tab-pane fade show active" id="oneA" role="tabpanel">
                                  <div className="row gx-3">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a1">
                                          First Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-account-circle-line"></i>
                                          </span>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a2">
                                          Last Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-account-circle-line"></i>
                                          </span>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={formData.lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="selectGender1">
                                          Gender<span className="text-danger">*</span>
                                        </label>
                                        <div className="m-0">
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="gender"
                                              id="selectGender1"
                                              value="Male"
                                              checked={formData.gender === "Male"}
                                              onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="selectGender1">
                                              Male
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="gender"
                                              id="selectGender2"
                                              value="Female"
                                              checked={formData.gender === "Female"}
                                              onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="selectGender2">
                                              Female
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="gender"
                                              id="selectGender3"
                                              value="Other"
                                              checked={formData.gender === "Other"}
                                              onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="selectGender3">
                                              Other
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a3">
                                          Age <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          value={formData.age}
                                          name="age"
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a5">
                                          Email ID <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-mail-open-line"></i>
                                          </span>
                                          <input
                                            type="email"
                                            className="form-control"
                                            id="a5"
                                            value={formData.email}
                                            onChange={handleChange}
                                            name="email"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a6">
                                          Mobile Number <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-phone-line"></i>
                                          </span>
                                          <input
                                            type="number"
                                            className="form-control"
                                            id="a6"
                                            value={formData.mobile}
                                            name="mobile"
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="a8">
                                          Qualifications <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-flower-line" />
                                          </span>
                                          <select
                                            className="form-select"
                                            id="a8"
                                            name="qualifications"
                                            value={formData.qualifications || "0"}
                                            onChange={handleChange}
                                          >
                                            <option value="0">Select Qualifications</option>
                                            <option value="MBBS">MBBS</option>
                                            <option value="MD">MD</option>
                                            <option value="DNB">DNB</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                          className="form-select"
                                          name="status"
                                          value={formData.status}
                                          onChange={handleChange}
                                        >
                                          <option value="active">Active</option>
                                          <option value="inactive">Inactive</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label">Experience</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="experience"
                                          value={formData.experience}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="tab-pane fade" id="threeA" role="tabpanel">
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                                      <Button
                                        onClick={detectTimeZone}
                                        variant="contained"
                                        sx={{ width: "200px", background: "#116af0", fontSize: ".9rem" }}
                                      >
                                        Detect Time Zone
                                      </Button>
                                      <Select
                                        style={{ width: "30%", marginTop: "5px" }}
                                        value={timeZone}
                                        onChange={(value) => setTimeZone(value)}
                                      >
                                        {moment.tz.names().map((tz) => (
                                          <MenuItem key={tz} value={tz}>
                                            {tz}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      <Typography variant="body1" sx={{ marginLeft: "40px", marginTop: "5px", fontSize: "1rem" }}>
                                        Slot Duration:
                                      </Typography>
                                      <Select
                                        style={{ width: "10%" }}
                                        value={slotDuration}
                                        onChange={(value) => setSlotDuration(value)}
                                      >
                                        {[15, 30, 45, 60].map((duration) => (
                                          <MenuItem key={duration} value={duration}>
                                            {duration} min
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </Grid>
                                    {Object.keys(schedule).map((day) => (
                                      <Grid item xs={12} md={6} key={day} sx={{ zoom: "0.9" }}>
                                        <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
                                          <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h7">{dayNameMapping[day] || day}</Typography>
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
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="u1">
                                          User Name
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-account-pin-circle-line"></i>
                                          </span>
                                          <input
                                            type="text"
                                            id="u1"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                            name="username"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label className="form-label" htmlFor="u2">
                                          New Password
                                        </label>
                                        <div className="input-group">
                                          <span className="input-group-text">
                                            <i className="ri-lock-password-line"></i>
                                          </span>
                                          <input
                                            type="password"
                                            id="u2"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            name="password"
                                          />
                                          <button className="btn btn-outline-secondary" type="button">
                                            <i className="ri-eye-line"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ padding: "10px 30px", fontSize: "16px" }}
                              >
                                Update Doctor Profile
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

export default ManageAvailbility;







// import { useState, useEffect } from "react";
// import Sidebar from "../../../components/doctor/DrSidebar";
// import Topbar from "../../../components/doctor/Topbar";
// import { postAPI, getAPI } from "../../../API/commonAPI";
// import { notification, Select, Form } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { Switch, TextField, Box, Typography, Paper, Grid, Button,MenuItem  } from "@mui/material";

// // import { TimePicker, Switch, Card } from "antd";

// import {  DatePicker } from "antd";
// // import moment from "moment"; // Ant Design uses moment.js for time formatting

// import moment from "moment-timezone";

// const ManageAvailbility = () => {
//  const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const [api, contextHolder] = notification.useNotification();

//   const [doctorData, setDoctorData] = useState({});
//   const [departments, setDepartments] = useState([]);
//   const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
//   const [slotDuration, setSlotDuration] = useState(30);
//   const [schedule, setSchedule] = useState({});
//   const [profilePhoto, setProfilePhoto] = useState(null); // New state for file input
//   const [previewImage, setPreviewImage] = useState(null); // State for image preview

//   const [formData, setFormData] = useState({
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
//     schedule: {},
//   });

//   const dayNameMapping = {
//     sun: "Sunday",
//     mon: "Monday",
//     tue: "Tuesday",
//     wed: "Wednesday",
//     thu: "Thursday",
//     fri: "Friday",
//     sat: "Saturday",
//   };

//   useEffect(() => {
//     fetchDoctorDetails();
//     fetchDepartments();
//   }, []);

//   const fetchDoctorDetails = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-single-doctor/${id}`);
//       if (response.data.status) {
//         const doctor = response.data.doctor;
//         setDoctorData(doctor);
//         setTimeZone(doctor.timeZone || "UTC");
//         setSlotDuration(doctor.slotDuration || 30);

//         const updatedSchedule = {};
//         Object.keys(doctor.schedule || {}).forEach((day) => {
//           updatedSchedule[day] = Array.isArray(doctor.schedule[day])
//             ? doctor.schedule[day]
//             : doctor.schedule[day]?.start && doctor.schedule[day]?.end
//             ? [{ start: doctor.schedule[day].start, end: doctor.schedule[day].end }]
//             : [];
//         });
//         setSchedule(updatedSchedule);

//         setFormData({
//           ...doctor,
//           specialization: Array.isArray(doctor.specialization)
//             ? doctor.specialization.map((spec) => spec._id)
//             : [doctor.specialization?._id || doctor.specialization],
//         });

//         // Set initial preview image if profilePhoto exists
//         if (doctor.profilePhoto) {
//           setPreviewImage(`${import.meta.env.VITE_API_URL}${doctor.profilePhoto}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching doctor details", error);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const result = await axios.get(`${import.meta.env.VITE_API_URL}/department/all-department`);
//       if (result.data.status) {
//         setDepartments(result.data.departments);
//       }
//     } catch (error) {
//       console.error("Error fetching departments", error);
//     }
//   };

//   const detectTimeZone = () => {
//     const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     setTimeZone(detectedTimeZone);
//     setFormData((prev) => ({ ...prev, timeZone: detectedTimeZone }));
//   };

//   const handleAddSlot = (day) => {
//     setSchedule((prev) => ({
//       ...prev,
//       [day]: [...(prev[day] || []), { start: "", end: "" }],
//     }));
//   };

//   const handleRemoveSlot = (day, index) => {
//     setSchedule((prev) => ({
//       ...prev,
//       [day]: prev[day].filter((_, i) => i !== index),
//     }));
//   };

//   const handleScheduleChange = (day, index, field, value) => {
//     setSchedule((prev) => {
//       const updatedDaySchedule = [...(prev[day] || [])];
//       const isDuplicate = updatedDaySchedule.some((slot, i) => i !== index && (slot.start === value || slot.end === value));
//       if (isDuplicate) {
//         notification.error({ message: "Error", description: "Duplicate time slot detected!" });
//         return prev;
//       }
//       updatedDaySchedule[index][field] = value;
//       return { ...prev, [day]: updatedDaySchedule };
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePhoto(file);
//       setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
    
//     // Exclude timeZone and slotDuration from formData to avoid duplication
//     Object.keys(formData).forEach((key) => {
//       if (key === "schedule") {
//         data.append(key, JSON.stringify(schedule));
//       } else if (key === "specialization") {
//         data.append(key, formData[key][0]); // Send single specialization ID
//       } else if (key !== "timeZone" && key !== "slotDuration") { // Skip these fields
//         data.append(key, formData[key]);
//       }
//     });
    
//     // Append single values for timeZone and slotDuration
//     data.append("timeZone", timeZone);
//     data.append("slotDuration", slotDuration);
//     if (profilePhoto) {
//       data.append("profilePhoto", profilePhoto);
//     }
  
//     // Log FormData content for debugging
//     for (let [key, value] of data.entries()) {
//       console.log(`${key}:`, value);
//     }
  
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_API_URL}/admin/edit-doctor/${id}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       notification.success({ message: "Success", description: "Doctor updated successfully." });
//     } catch (error) {
//       console.error("Error updating doctor:", error.response?.data || error.message);
//       notification.error({ message: "Update Failed", description: "Failed to update doctor profile." });
//     }
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
//             <div className="app-container">
//                       <div className="app-hero-header d-flex align-items-center">
//                         <ol className="breadcrumb">
//                           <li className="breadcrumb-item">
//                             <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
//                             <a href="/">Home</a>
//                           </li>
//                           <li className="breadcrumb-item text-primary" aria-current="page">
//                             Edit Doctor Profile
//                           </li>
//                         </ol>
//                         <div className="ms-auto d-lg-flex d-none flex-row">
//                           <div className="d-flex flex-row gap-1 day-sorting">
//                             <button className="btn btn-sm btn-primary">Today</button>
//                             <button className="btn btn-sm">7d</button>
//                             <button className="btn btn-sm">2w</button>
//                             <button className="btn btn-sm">1m</button>
//                             <button className="btn btn-sm">3m</button>
//                             <button className="btn btn-sm">6m</button>
//                             <button className="btn btn-sm">1y</button>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="app-body">
//                         <div className="row gx-3">
//                           <div className="col-xl-12">
//                             <div className="card">
//                               <div className="card-body">
//                                 <form onSubmit={handleSubmit}>
//                                   <div className="custom-tabs-container">
//                                     <ul className="nav nav-tabs" id="customTab2" role="tablist">
//                                       <li className="nav-item" role="presentation">
//                                         <a
//                                           className="nav-link active"
//                                           id="tab-oneA"
//                                           data-bs-toggle="tab"
//                                           href="#oneA"
//                                           role="tab"
//                                           aria-controls="oneA"
//                                           aria-selected="true"
//                                         >
//                                           <i className="ri-briefcase-4-line"></i> Personal Details
//                                         </a>
//                                       </li>
//                                       <li className="nav-item" role="presentation">
//                                         <a
//                                           className="nav-link"
//                                           id="tab-threeA"
//                                           data-bs-toggle="tab"
//                                           href="#threeA"
//                                           role="tab"
//                                           aria-controls="threeA"
//                                           aria-selected="false"
//                                         >
//                                           <i className="ri-calendar-check-line"></i> Availability
//                                         </a>
//                                       </li>
//                                       <li className="nav-item" role="presentation">
//                                         <a
//                                           className="nav-link"
//                                           id="tab-fourA"
//                                           data-bs-toggle="tab"
//                                           href="#fourA"
//                                           role="tab"
//                                           aria-controls="fourA"
//                                           aria-selected="false"
//                                         >
//                                           <i className="ri-lock-password-line"></i> Account Details
//                                         </a>
//                                       </li>
//                                     </ul>
//                                     <div className="tab-content">
//                                       <div className="tab-pane fade show active" id="oneA" role="tabpanel">
//                                         <div className="row gx-3">
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a1">
//                                                 First Name <span className="text-danger">*</span>
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-account-circle-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="text"
//                                                   className="form-control"
//                                                   name="firstName"
//                                                   value={formData.firstName}
//                                                   onChange={handleChange}
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a2">
//                                                 Last Name <span className="text-danger">*</span>
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-account-circle-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="text"
//                                                   className="form-control"
//                                                   value={formData.lastName}
//                                                   name="lastName"
//                                                   onChange={handleChange}
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="selectGender1">
//                                                 Gender<span className="text-danger">*</span>
//                                               </label>
//                                               <div className="m-0">
//                                                 <div className="form-check form-check-inline">
//                                                   <input
//                                                     className="form-check-input"
//                                                     type="radio"
//                                                     name="gender"
//                                                     id="selectGender1"
//                                                     value="Male"
//                                                     checked={formData.gender === "Male"}
//                                                     onChange={handleChange}
//                                                   />
//                                                   <label className="form-check-label" htmlFor="selectGender1">
//                                                     Male
//                                                   </label>
//                                                 </div>
//                                                 <div className="form-check form-check-inline">
//                                                   <input
//                                                     className="form-check-input"
//                                                     type="radio"
//                                                     name="gender"
//                                                     id="selectGender2"
//                                                     value="Female"
//                                                     checked={formData.gender === "Female"}
//                                                     onChange={handleChange}
//                                                   />
//                                                   <label className="form-check-label" htmlFor="selectGender2">
//                                                     Female
//                                                   </label>
//                                                 </div>
//                                                 <div className="form-check form-check-inline">
//                                                   <input
//                                                     className="form-check-input"
//                                                     type="radio"
//                                                     name="gender"
//                                                     id="selectGender3"
//                                                     value="Other"
//                                                     checked={formData.gender === "Other"}
//                                                     onChange={handleChange}
//                                                   />
//                                                   <label className="form-check-label" htmlFor="selectGender3">
//                                                     Other
//                                                   </label>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a3">
//                                                 Age <span className="text-danger">*</span>
//                                               </label>
//                                               <input
//                                                 type="number"
//                                                 className="form-control"
//                                                 value={formData.age}
//                                                 name="age"
//                                                 onChange={handleChange}
//                                               />
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a5">
//                                                 Email ID <span className="text-danger">*</span>
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-mail-open-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="email"
//                                                   className="form-control"
//                                                   id="a5"
//                                                   value={formData.email}
//                                                   onChange={handleChange}
//                                                   name="email"
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a6">
//                                                 Mobile Number <span className="text-danger">*</span>
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-phone-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="number"
//                                                   className="form-control"
//                                                   id="a6"
//                                                   value={formData.mobile}
//                                                   name="mobile"
//                                                   onChange={handleChange}
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a7">
//                                                 Profile Photo
//                                               </label>
//                                               <input
//                                                 type="file"
//                                                 className="form-control"
//                                                 id="a7"
//                                                 accept="image/*"
//                                                 onChange={handleFileChange}
//                                               />
//                                               {previewImage && (
//                                                 <img
//                                                   src={previewImage}
//                                                   alt="Profile Preview"
//                                                   style={{
//                                                     width: "100px",
//                                                     height: "100px",
//                                                     borderRadius: "50%",
//                                                     objectFit: "cover",
//                                                     marginTop: "10px",
//                                                   }}
//                                                 />
//                                               )}
//                                             </div>
//                                           </div>
//                                           {/* <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a8">
//                                                 Qualification
//                                               </label>
//                                               <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="a8"
//                                                 value={formData.qualifications}
//                                                 onChange={handleChange}
//                                                 name="qualifications"
//                                               />
//                                             </div>
//                                           </div> */}
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             {/* <div className="mb-3">
//                                               <label className="form-label">Specialization</label>
//                                               <Select
//                                                 className="w-100"
//                                                 placeholder="Select Specialization"
//                                                 value={formData.specialization[0] || null}
//                                                 onChange={(value) => setFormData({ ...formData, specialization: [value] })}
//                                                 allowClear={true}
//                                               >
//                                                 {departments.map((dept) => (
//                                                   <Select.Option key={dept._id} value={dept._id}>
//                                                     {dept.department}
//                                                   </Select.Option>
//                                                 ))}
//                                               </Select>
//                                             </div> */}
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="a8">
//                                                 Qualifications <span className="text-danger">*</span>
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-flower-line" />
//                                                 </span>
//                                                 <select
//                                                   className="form-select"
//                                                   id="a8"
//                                                   name="qualifications"
//                                                   value={formData.qualifications || "0"} // Default to "Select Qualifications"
//                                                   onChange={handleChange}
//                                                 >
//                                                   <option value="0">Select Qualifications</option>
//                                                   <option value="MBBS">MBBS</option>
//                                                   <option value="MD">MD</option>
//                                                   <option value="DNB">DNB</option>
//                                                 </select>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label">Status</label>
//                                               <select
//                                                 className="form-select"
//                                                 name="status"
//                                                 value={formData.status}
//                                                 onChange={handleChange}
//                                               >
//                                                 <option value="active">Active</option>
//                                                 <option value="inactive">Inactive</option>
//                                               </select>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label">Experience</label>
//                                               <input
//                                                 type="number"
//                                                 className="form-control"
//                                                 name="experience"
//                                                 value={formData.experience}
//                                                 onChange={handleChange}
//                                               />
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="tab-pane fade" id="threeA" role="tabpanel">
//                                         <Grid container spacing={3}>
//                                           <Grid item xs={12} sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
//                                             <Button
//                                               onClick={detectTimeZone}
//                                               variant="contained"
//                                               sx={{ width: "200px", background: "#116af0", fontSize: ".9rem" }}
//                                             >
//                                               Detect Time Zone
//                                             </Button>
//                                             <Select
//                                               style={{ width: "30%", marginTop: "5px" }}
//                                               value={timeZone}
//                                               onChange={(value) => setTimeZone(value)}
//                                             >
//                                               {moment.tz.names().map((tz) => (
//                                                 <MenuItem key={tz} value={tz}>
//                                                   {tz}
//                                                 </MenuItem>
//                                               ))}
//                                             </Select>
//                                             <Typography variant="body1" sx={{ marginLeft: "40px", marginTop: "5px", fontSize: "1rem" }}>
//                                               Slot Duration:
//                                             </Typography>
//                                             <Select
//                                               style={{ width: "10%" }}
//                                               value={slotDuration}
//                                               onChange={(value) => setSlotDuration(value)}
//                                             >
//                                               {[15, 30, 45, 60].map((duration) => (
//                                                 <MenuItem key={duration} value={duration}>
//                                                   {duration} min
//                                                 </MenuItem>
//                                               ))}
//                                             </Select>
//                                           </Grid>
//                                           {Object.keys(schedule).map((day) => (
//                                             <Grid item xs={12} md={6} key={day} sx={{ zoom: "0.9" }}>
//                                               <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
//                                                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                                                   <Typography variant="h7">{dayNameMapping[day] || day}</Typography>
//                                                   <Button onClick={() => handleAddSlot(day)}>➕</Button>
//                                                 </Box>
//                                                 {schedule[day]?.map((slot, index) => (
//                                                   <Box key={index} mt={2} display="flex" alignItems="center" gap={2}>
//                                                     <TextField
//                                                       label="Start Time"
//                                                       type="time"
//                                                       value={slot.start}
//                                                       onChange={(e) => handleScheduleChange(day, index, "start", e.target.value)}
//                                                       fullWidth
//                                                       InputLabelProps={{ shrink: true }}
//                                                     />
//                                                     <Typography variant="h6">--</Typography>
//                                                     <TextField
//                                                       label="End Time"
//                                                       type="time"
//                                                       value={slot.end}
//                                                       onChange={(e) => handleScheduleChange(day, index, "end", e.target.value)}
//                                                       fullWidth
//                                                       InputLabelProps={{ shrink: true }}
//                                                     />
//                                                     <Button onClick={() => handleRemoveSlot(day, index)}>
//                                                       <DeleteIcon color="error" />
//                                                     </Button>
//                                                   </Box>
//                                                 ))}
//                                               </Paper>
//                                             </Grid>
//                                           ))}
//                                         </Grid>
//                                       </div>
//                                       <div className="tab-pane fade" id="fourA" role="tabpanel">
//                                         <div className="row gx-3">
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="u1">
//                                                 User Name
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-account-pin-circle-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="text"
//                                                   id="u1"
//                                                   className="form-control"
//                                                   value={formData.username}
//                                                   onChange={handleChange}
//                                                   name="username"
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div className="col-xxl-3 col-lg-4 col-sm-6">
//                                             <div className="mb-3">
//                                               <label className="form-label" htmlFor="u2">
//                                                 New Password
//                                               </label>
//                                               <div className="input-group">
//                                                 <span className="input-group-text">
//                                                   <i className="ri-lock-password-line"></i>
//                                                 </span>
//                                                 <input
//                                                   type="password"
//                                                   id="u2"
//                                                   className="form-control"
//                                                   value={formData.password}
//                                                   onChange={handleChange}
//                                                   name="password"
//                                                 />
//                                                 <button className="btn btn-outline-secondary" type="button">
//                                                   <i className="ri-eye-line"></i>
//                                                 </button>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="d-flex gap-2 justify-content-end mt-4">
//                                     <button type="submit" className="btn btn-primary">
//                                       Update Doctor Profile
//                                     </button>
//                                   </div>
//                                 </form>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//           {/* App container ends */}
//         </div>
//         {/* Main container ends */}
//       </div>
//     </>
//   );
// };

// export default ManageAvailbility;
