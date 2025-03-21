import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { notification } from "antd";
import { useParams } from "react-router-dom";

const EditPatient = () => {
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    blood_group: "",
    treatment: "",
    mobile: "",
    email: "",
    address: "",
    profilePhoto: "",
    // Do not include password here initially
  });
  const [password, setPassword] = useState(""); // Separate state for password input
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem("token");
  const { patientId } = useParams();

  useEffect(() => {
    // Fetch patient data from API
    axios
      .get(`${import.meta.env.VITE_API_URL}/patient/get-single-patient/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const patientData = response.data.data;
        // Exclude password from formData
        const { password, ...rest } = patientData;
        setFormData(rest);
        // Set initial preview image if profilePhoto exists
        if (patientData.profilePhoto) {
          setPreviewImage(`${import.meta.env.VITE_API_URL}${patientData.profilePhoto}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data", error);
      });
  }, [patientId, token]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "profilePhoto" || !profilePhotoFile) {
        data.append(key, formData[key]);
      }
    });
    if (profilePhotoFile) {
      data.append("profilePhoto", profilePhotoFile);
    }
    if (password.trim() !== "") {
      data.append("password", password); // Only append password if provided
    }

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/patient/update-patient/${patientId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        openNotification(true, "Success", "Patient updated successfully");
        if (response.data.data.profilePhoto) {
          setFormData((prev) => ({
            ...prev,
            profilePhoto: response.data.data.profilePhoto,
          }));
          setPreviewImage(`${import.meta.env.VITE_API_URL}${response.data.data.profilePhoto}`);
        }
        setProfilePhotoFile(null);
        setPassword(""); // Clear password field after submission
      })
      .catch((error) => {
        openNotification(
          false,
          "Error",
          error.response?.data?.message || "Something went wrong"
        );
      });
  };

  return (
    <div className="page-wrapper">
      {contextHolder}
      <Topbar />
            <div className="main-container">
              <Sidebar />
              <div className="app-body">
                <div className="card" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                  <div className="app-container">
                    {/* <div className="app-hero-header d-flex align-items-center">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/patient/doctors-list">Doctors List</a>
                    </li>
                    <li className="breadcrumb-item text-primary">Doctor Profile</li>
                  </ol>
                </div> */}
                    <div className="app-body">
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
                              accept="image/jpeg,image/jpg,image/png"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
      
                        {/* Form Fields Section */}
                        <div className="row gx-3">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="first_name">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="last_name">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="age">
                                Age
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="gender">
                                Gender
                              </label>
                              <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="blood_group">
                                Blood Group
                              </label>
                              <select
                                className="form-select"
                                id="blood_group"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                              >
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="O+">O+</option>
                                <option value="AB+">AB+</option>
                                <option value="O-">O-</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="AB-">AB-</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="email">
                                Email ID
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="mobile">
                                Mobile Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="address">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="treatment">
                                Treatment
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="treatment"
                                name="treatment"
                                value={formData.treatment}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="password">
                                New Password (leave blank to keep unchanged)
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ padding: "10px 30px", fontSize: "16px" }}
                            >
                              Update Profile
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default EditPatient;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";
// import { notification } from "antd";
// import { useParams } from "react-router-dom";

// const EditPatient = () => {
//   const [api, contextHolder] = notification.useNotification();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     gender: "",
//     age: "",
//     blood_group: "",
//     treatment: "",
//     mobile: "",
//     email: "",
//     address: "",
//     password: "",
//   });

//   const token = localStorage.getItem("token");

//   const {patientId} = useParams();


//   useEffect(() => {
//     // Fetch patient data from API
//     axios 
//       .get(`${import.meta.env.VITE_API_URL}/patient/get-single-patient/${patientId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }) // Adjust the endpoint as needed
//       .then((response) => {
//         setFormData(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching patient data", error);
//       });
//   }, [patientId]);

//   const openNotification = (status, title, desc) => {
//     if (status) {
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     axios
//       .put(
//         `${import.meta.env.VITE_API_URL}/patient/update-patient/${patientId}`, // Endpoint
//         formData,  // Form data to be sent
//         {  // Config object
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         openNotification(true, "Success", "Patient updated successfully");
//       })
//       .catch((error) => {
//         openNotification(false, "Error", error.response?.data?.message || "Something went wrong");
//       });
//   };
  

//   return (
//     <div className="page-wrapper">
//       {contextHolder}
//       <Topbar />
//       <div className="main-container">
//         <Sidebar />
//         <div className="app-body">
//           <div className="card">
//             <div className="app-container">
//               <div className="app-hero-header d-flex align-items-center">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
//                     <a href="index-2.html">Home</a>
//                   </li>
//                   <li className="breadcrumb-item text-primary" aria-current="page">
//                     Edit Patient Details
//                   </li>
//                 </ol>
//               </div>

//               <div className="app-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row gx-3">
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="first_name">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="first_name"
//                           name="first_name"
//                           value={formData.first_name}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="last_name">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="last_name"
//                           name="last_name"
//                           value={formData.last_name}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="age">
//                           Age
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="age"
//                           name="age"
//                           value={formData.age}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="gender">
//                           Gender
//                         </label>
//                         <select
//                           className="form-select"
//                           id="gender"
//                           name="gender"
//                           value={formData.gender}
//                           onChange={handleChange}
//                         >
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="blood_group">
//                           Blood Group
//                         </label>
//                         <select
//                           className="form-select"
//                           id="blood_group"
//                           name="blood_group"
//                           value={formData.blood_group}
//                           onChange={handleChange}
//                         >
//                           <option value="A+">A+</option>
//                           <option value="B+">B+</option>
//                           <option value="O+">O+</option>
//                           <option value="AB+">AB+</option>
//                           <option value="O-">O-</option>
//                           <option value="A-">A-</option>
//                         </select>
//                       </div>
//                     </div>
//                     {/* Add similar inputs for other fields */}
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="email">
//                           Email ID
//                         </label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           id="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="mobile">
//                           Mobile Number
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="mobile"
//                           name="mobile"
//                           value={formData.mobile}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-lg-4 col-sm-6">
//                       <div className="mb-3">
//                         <label className="form-label" htmlFor="address">
//                           Address
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="address"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <button type="submit" className="btn btn-primary">
//                         Update Patient
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPatient;





