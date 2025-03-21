// import { jwtDecode } from "jwt-decode";
// import { useState } from "react";
// import { notification } from "antd";

// const DrSidebar = () => {
//   const doctorToken=localStorage.getItem("doctorToken");
//   const decodeToken=jwtDecode(doctorToken);

//   const [meetingLink, setMeetingLink] = useState("");
//   console.log("decodeTokenssss",decodeToken);

//   const openNotification = (status, title, desc) => {
//     if (status) {
//       notification.success({
//         message: title,
//         description: desc,
//       });
//     } else {
//       notification.error({
//         message: title,
//         description: desc,
//       });
//     }
//   };

//   const handleCreateMeeting = () => {
//     const roomId = Math.floor(Math.random() * 1000000);  // Generate random room ID
//     const link = `${window.location.origin}/doctor/meeting/${roomId}`;
//     setMeetingLink(link);
//     openNotification(true, "Meeting Created", "Meeting link has been generated.");
//   };

//   return (
//     <nav id="sidebar" className="sidebar-wrapper">
//       {/* {contextHolder} */}
//       {/* Sidebar profile starts */}
//       <div className="sidebar-profile">
//         <img
//           src="/assets/images/user6.png"
//           className="img-shadow img-3x me-3 rounded-5"
//           alt="Hospital Admin Templates"
//         />
//         <div className="m-0">
//           <h5 className="mb-1 profile-name text-nowrap text-truncate">
//             {decodeToken?.user?.firstName}
//           </h5>
//           <p className="m-0 small profile-name text-nowrap text-truncate">
//             Doctor
//           </p>
//         </div>
//       </div>
//       {/* Sidebar profile ends */}
//       {/* Sidebar menu starts */}
//       <div className="sidebarMenuScroll">
//         <ul className="sidebar-menu">
//           <li>
//             <a href="/doctor/dashboard">
//               <i className="ri-home-6-line" />
//               <span className="menu-text"> Dashboard</span>
//             </a>
//           </li>

//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-heart-pulse-line" />
//               <span className="menu-text">Patients</span>
//             </a>
//             <ul className="treeview-menu">
//               {/* <li>
//                      <a href="patient-dashboard">Patients Dashboard</a>
//                  </li> */}
//               <li>
//                 <a href="/doctor/view-patients">Patients List</a>
//               </li>

//             </ul>
//           </li>

//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-nurse-line" />
//               <span className="menu-text">Meeting</span>
//             </a>
//             <ul className="treeview-menu">
//               <li>
//                 <a href="/doctor/create">Create Meeting</a>
//               </li>

//             </ul>
//           </li>

//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-dossier-line" />
//               <span className="menu-text">Appointments</span>
//             </a>
//             <ul className="treeview-menu">

//               <li>
//                 <a href="/doctor/all-appointments">All Appointments </a>
//               </li>
//             </ul>
//           </li>

//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-dossier-line" />
//               <span className="menu-text">Doctor Availability</span>
//             </a>
//             <ul className="treeview-menu">
//               {/* <li>
//                 <a href="#">Appointments</a>
//               </li> */}
//              <li>
//   <a href={`/doctor/availability/${decodeToken?.user?._id}`}>Manage Availability</a>
// </li>

//             </ul>
//           </li>

//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-nurse-line" />
//               <span className="menu-text">Appointment Manager</span>
//             </a>
//             <ul className="treeview-menu">
//               <li>
//                 <a href="/doctor/view-appoinment-manager">View List</a>
//               </li>
//               <li>
//                 <a href="/doctor/add-staff">Add Manager Staff</a>
//               </li>
//               {/* <li>
//                      <a href="edit-staff">Edit Staff Details</a>
//                  </li> */}
//             </ul>
//           </li>

//           <li>
//             <a href="#">
//               <i className="ri-settings-5-line" />
//               <span className="menu-text">Account Settings</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
// export default DrSidebar;

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

const DrSidebar = () => {
  const doctorToken = localStorage.getItem("doctorToken");
  const decodeToken = jwtDecode(doctorToken);
  const doctorId = decodeToken?.user?._id; // Get doctor ID from token

  const [meetingLink, setMeetingLink] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null); // State for profile photo

  console.log("decodeTokenssss", decodeToken);

  const openNotification = (status, title, desc) => {
    if (status) {
      notification.success({
        message: title,
        description: desc,
      });
    } else {
      notification.error({
        message: title,
        description: desc,
      });
    }
  };

  const handleCreateMeeting = () => {
    const roomId = Math.floor(Math.random() * 1000000); // Generate random room ID
    const link = `${window.location.origin}/doctor/meeting/${roomId}`;
    setMeetingLink(link);
    openNotification(
      true,
      "Meeting Created",
      "Meeting link has been generated."
    );
  };

  // Fetch doctor details including profilePhoto
  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-single-doctor/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${doctorToken}`, // Use doctorToken for auth
          },
        }
      );
      if (response.data.status) {
        const doctor = response.data.doctor;
        // Set profile photo if it exists
        if (doctor.profilePhoto) {
          setProfilePhoto(
            `${import.meta.env.VITE_API_URL}${doctor.profilePhoto}`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching doctor details", error);
    }
  };

  // Fetch doctor details on component mount
  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      {/* Sidebar profile starts */}
      <div className="sidebar-profile">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            className="img-shadow img-3x me-3 rounded-5"
            alt={`${decodeToken?.user?.firstName} ${
              decodeToken?.user?.lastName || ""
            }`}
            onError={(e) => (e.target.src = "/assets/images/user6.png")} // Fallback to static image
          />
        ) : (
          <AccountCircleIcon
            className="img-shadow img-3x me-3 rounded-5"
            style={{ fontSize: "60px", color: "#757575" }} // Adjust size to match img-3x
          />
        )}
        <div className="m-0">
          <h5 className="mb-1 profile-name text-nowrap text-truncate">
            Dr. {decodeToken?.user?.firstName}
          </h5>
          {/* <p className="m-0 small profile-name text-nowrap text-truncate">
            Doctor
          </p> */}
        </div>
      </div>
      {/* Sidebar profile ends */}
      {/* Sidebar menu starts */}
      <div className="sidebarMenuScroll">
        <ul className="sidebar-menu">
          <li>
            <a href="/doctor/dashboard">
              <i className="ri-home-6-line" />
              <span className="menu-text"> Dashboard</span>
            </a>
          </li>

          <li className="treeview">
            <a href="#!">
              <i className="ri-heart-pulse-line" />
              <span className="menu-text">Patients</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/doctor/view-patients">Patients List</a>
              </li>
            </ul>
          </li>

          <li className="treeview">
            <a href="#!">
              <i className="ri-nurse-line" />
              <span className="menu-text">Meeting</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/doctor/create">Create Meeting</a>
              </li>
            </ul>
          </li>

          <li className="treeview">
            <a href="#!">
              <i className="ri-dossier-line" />
              <span className="menu-text">Appointments</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/doctor/all-appointments">All Appointments </a>
              </li>
            </ul>
          </li>

          <li className="treeview">
            <a href="#!">
              <i className="ri-dossier-line" />
              <span className="menu-text">Doctor Availability</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href={`/doctor/availability/${decodeToken?.user?._id}`}>
                  Manage Availability
                </a>
              </li>
            </ul>
          </li>

          <li className="treeview">
            <a href="#!">
              <i className="ri-nurse-line" />
              <span className="menu-text">Appointment Manager</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/doctor/view-appoinment-manager">View List</a>
              </li>
              <li>
                <a href="/doctor/add-staff">Add Manager Staff</a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-dossier-line" />
              <span className="menu-text">Demo Meeting</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/doctor/demo-create">Meeting</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i className="ri-settings-5-line" />
              <span className="menu-text">Account Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DrSidebar;
