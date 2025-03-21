// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";
// import { notification } from "antd";

// const AddPatient = () => {
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
//     state: "",
//     postal_code: "",
//     doctor: "", // New field
//   });

//   const [doctors, setDoctors] = useState([]);

//   // const [success, setSuccess] = useState("");
//   // const navigate = useNavigate();

//   console.log("doctor",doctors)
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-doctor`);
//         setDoctors(response.data.doctors);
//       } catch (error) {
//         console.error("Error fetching doctors", error);
//       }
//     };
  
//     fetchDoctors();
//   }, []);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/patient/add-patient`,
//         { ...formData },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const { status, message, desc } = response.data;
//       openNotification(status, message, desc);
//       setFormData({
//         first_name: "",
//         last_name: "",
//         gender: "",
//         age: "",
//         blood_group: "",
//         treatment: "",
//         mobile: "",
//         email: "",
//         address: "",
//         password: "",
//         state: "",
//         postal_code: "",
//       });

//       // window.location.href = "/view-patients";
//     } catch (error) {
//       const { status, message, desc } = error.response.data;
//       openNotification(status, message, desc);
//     }
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
//                     <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                     <a href="/">Home</a>
//                   </li>
//                   <li
//                     className="breadcrumb-item text-primary"
//                     aria-current="page"
//                   >
//                     Add Patient
//                   </li>
//                 </ol>
//               </div>
//               <div className="app-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row gx-3">
//                     <div className="col-sm-6 mb-3">
//                       <label>First Name</label>
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter First Name"
//                         required
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Last Name</label>
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Last Name"
//                         required
//                       />
//                     </div>

//                     <div className="col-sm-6 mb-3">
//   <label>Assign Doctor</label>
//   <select
//     name="doctor"
//     value={formData.doctor}
//     onChange={handleChange}
//     className="form-select"
//     required
//   >
//     <option value="">Select Doctor</option>
//     {doctors?.map((doc) => (
//       <option key={doc._id} value={doc._id}>
//         {doc.firstName} {doc.lastName}
//       </option>
//     ))}
//   </select>
// </div>



//                     <div className="col-sm-6 mb-3">
//                       <label>Gender</label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="form-select"
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Age</label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Age"
//                         min={0}
//                         max={150}
//                         required
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Blood Group</label>
//                       <select
//                         name="blood_group"
//                         value={formData.blood_group}
//                         onChange={handleChange}
//                         className="form-select"
//                         required
//                       >
//                         <option value="">Select Blood Group</option>
//                         <option value="A+">A+</option>
//                         <option value="A-">A-</option>
//                         <option value="B+">B+</option>
//                         <option value="B-">B-</option>
//                         <option value="AB+">AB+</option>
//                         <option value="AB-">AB-</option>
//                         <option value="O+">O+</option>
//                         <option value="O-">O-</option>
//                       </select>
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Treatment</label>
//                       <input
//                         type="text"
//                         name="treatment"
//                         value={formData.treatment}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Treatment"
//                         required
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Mobile</label>
//                       <input
//                         type="text"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Mobile Number"
//                         required
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Email</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Email"
//                         required
//                       />
//                     </div>

//                     <div className="col-sm-6 mb-3">
//                       <label>State</label>
//                       <select
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         className="form-select"
//                         required
//                       >
//                         <option value="">Select State</option>
//                         <option value="Alabama">Alabama</option>
//                         <option value="Alaska">Alaska</option>
//                         <option value="Arizona">Arizona</option>
//                         <option value="Arkansas">Arkansas</option>
//                         <option value="California">California</option>
//                         <option value="Colorado">Colorado</option>
//                         <option value="Connecticut">Connecticut</option>
//                         <option value="Delaware">Delaware</option>
//                         <option value="Florida">Florida</option>
//                         <option value="Georgia">Georgia</option>
//                         {/* Add all U.S. states */}
//                       </select>
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Postal Code</label>
//                       <input
//                         type="text"
//                         name="postal_code"
//                         value={formData.postal_code}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Postal Code"
//                         required
//                       />
//                     </div>

//                     <div className="col-sm-6 mb-3">
//                       <label>Password</label>
//                       <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Password"
//                         required
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-3">
//                       <label>Address</label>
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Enter Address"
//                         required
//                       ></textarea>
//                     </div>
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-3">
//                     Add Patient
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPatient;


import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { notification } from "antd";

const AddPatient = () => {
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
    password: "",
    state: "",
    postal_code: "",
    doctor: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null); // State for profile photo file
  const [previewImage, setPreviewImage] = useState(null); // State for image preview
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/get-doctor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (profilePhoto) {
      data.append("profilePhoto", profilePhoto); // Append profile photo file
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/add-patient`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { status, message, desc } = response.data;
      openNotification(status, message, desc);
      setFormData({
        first_name: "",
        last_name: "",
        gender: "",
        age: "",
        blood_group: "",
        treatment: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        state: "",
        postal_code: "",
        doctor: "",
      });
      setProfilePhoto(null);
      setPreviewImage(null);
    } catch (error) {
      const { status, message, desc } = error.response?.data || {
        status: false,
        message: "An error occurred",
        desc: "Please try again",
      };
      openNotification(status, message, desc);
    }
  };

  return (
    <div className="page-wrapper">
      {contextHolder}
      <Topbar />
      <div className="main-container">
        <Sidebar />
        <div className="app-body">
          <div className="card">
            <div className="app-container">
              <div className="app-hero-header d-flex align-items-center">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item text-primary" aria-current="page">
                    Add Patient
                  </li>
                </ol>
              </div>
              <div className="app-body">
                <form onSubmit={handleSubmit}>
                  <div className="row gx-3">
                    <div className="col-sm-6 mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter First Name"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Last Name"
                        required
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label>Assign Doctor</label>
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Doctor</option>
                        {doctors?.map((doc) => (
                          <option key={doc._id} value={doc._id}>
                            {doc.firstName} {doc.lastName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Age"
                        min={0}
                        max={150}
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Blood Group</label>
                      <select
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        className="form-select"
                        required
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
                    <div className="col-sm-6 mb-3">
                      <label>Treatment</label>
                      <input
                        type="text"
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Treatment"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Mobile</label>
                      <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Profile Photo</label>
                      <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleFileChange}
                        className="form-control"
                        accept="image/jpeg,image/jpg,image/png"
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        {/* Add all U.S. states */}
                      </select>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Postal Code"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Password"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Address"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Add Patient
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;