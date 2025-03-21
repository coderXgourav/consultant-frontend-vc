import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/doctor/Topbar";
import DrSidebar from "../../components/doctor/DrSidebar";
import { notification } from "antd";


const EditPatientByDoctor = () => {
  const { patientId } = useParams();
  const doctorToken = localStorage.getItem("doctorToken");
  const doctorId = JSON.parse(atob(doctorToken.split(".")[1])).user._id;

  const [api, contextHolder] = notification.useNotification();

  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    blood_group: "",
    treatment: "",
    mobile: "",
    email: "",
    address: "",
  });


  const openNotification = (status, title, desc) => {
    if (status) {
      api.success({
        message: title,
        description: desc,
      });
    } else {
      api.error({
        message: title,
        description: desc,
      });
    }
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/get-single-patient-by-doctor/${patientId}`
        );
        setPatientData(response.data.patient);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [doctorId, patientId]);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/update-patient-by-doctor/${doctorId}/${patientId}`,
        patientData
      );
      openNotification(true, "Success", "Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="page-wrapper">
         {contextHolder}
      <Topbar />
      <div className="main-container">
        <DrSidebar />
        <div className="app-container">
          <div className="app-hero-header d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                <a href="index-2.html">Home</a>
              </li>
              <li className="breadcrumb-item text-primary">Edit Patient</li>
            </ol>
          </div>

          <div className="app-body">
            <div className="container-fluid my-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* <h2 className="mb-4 text-primary">Edit Patient Information</h2> */}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={patientData.first_name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={patientData.last_name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-control"
                            name="gender"
                            value={patientData.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Age</label>
                          <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={patientData.age}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Blood Group</label>
                          <select
                            className="form-control"
                            name="blood_group"
                            value={patientData.blood_group}
                            onChange={handleChange}
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Treatment</label>
                          <input
                            type="text"
                            className="form-control"
                            name="treatment"
                            value={patientData.treatment}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Mobile</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            value={patientData.mobile}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={patientData.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={patientData.address}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary px-5">
                        Update Patient
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
  );
};

export default EditPatientByDoctor;
