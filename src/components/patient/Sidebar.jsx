import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit"; // Added Edit icon
import { Link } from "react-router-dom";

const Sidebar = () => {
  const patientToken = localStorage.getItem("patientToken");
  const decodeToken = jwtDecode(patientToken);
  const patientId = decodeToken?.user?._id;

  const [patientData, setPatientData] = useState(null);
  const [isHovering, setIsHovering] = useState(false); // Added state for hover

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/patient/get-single-patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${patientToken}`,
            },
          }
        );
        setPatientData(response.data.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId, patientToken]);

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      {/* Sidebar profile starts */}
      <div className="sidebar-profile">
        {/* Profile Image Container with Hover Effect */}

        <a
          href={`/view-patient-profile/${patientId}`}
          className="edit-profile-icon"
        >
          <div
            className="profile-image-container"
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {patientData?.profilePhoto ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${
                  patientData.profilePhoto
                }`}
                className="img-shadow img-3x me-3 rounded-5"
                alt={`${patientData.first_name} ${patientData.last_name || ""}`}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  transition: "filter 0.3s ease",
                }}
                onError={(e) => (e.target.src = "/assets/images/user6.png")}
              />
            ) : (
              <AccountCircleIcon
                className="img-shadow img-3x me-3 rounded-5"
                style={{
                  fontSize: "50px",
                  color: "#757575",
                  transition: "filter 0.3s ease",
                }}
              />
            )}

            {/* Edit Icon Overlay with Animation */}

            {/* Overlay when hovering */}
            <div
            // style={{
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            //   backgroundColor: "rgba(0, 0, 0, 0.5)",
            //   borderRadius: "5px",
            //   opacity: isHovering ? 0.5 : 0,
            //   transition: "opacity 0.3s ease",
            //   zIndex: 1
            // }}
            />
          </div>

          {/* <EditIcon style={{ fontSize: "16px", color: "white" }} /> */}
        </a>

        <div className="m-0">
          <h5 className="mb-1 profile-name text-nowrap text-truncate">
            {patientData?.first_name || decodeToken?.user?.first_name}
          </h5>
          <p className="m-0 small profile-name text-nowrap text-truncate">
            Patient
          </p>
        </div>
      </div>
      {/* Sidebar profile ends */}

      {/* Sidebar menu starts */}
      <div className="sidebarMenuScroll">
        <ul className="sidebar-menu">
          <li>
            <a href="/patient/dashboard">
              <i className="ri-home-6-line" />
              <span className="menu-text"> Dashboard</span>
            </a>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-heart-pulse-line" />
              <span className="menu-text">Doctors</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/patient/view-doctor">View Doctors</a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-nurse-line" />
              <span className="menu-text">Dependent</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="#">Add Dependent</a>
              </li>
              <li>
                <a href="#">View Dependents</a>
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
                <a href="/view-patient-booked-appointment">Appointments List</a>
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
                <a href="/patient/demo-meeting"> Meeting</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="ri-settings-5-line" />
              <span className="menu-text"> Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

// import { jwtDecode } from "jwt-decode";
// const Sidebar = () => {
//   const doctorToken=localStorage.getItem("patientToken");
//   const decodeToken=jwtDecode(doctorToken);
//   console.log("decodeTokenfff",decodeToken)

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
//           {decodeToken?.user?.first_name}
//           </h5>
//           <p className="m-0 small profile-name text-nowrap text-truncate">
//             Patient
//           </p>
//         </div>
//       </div>
//       {/* Sidebar profile ends */}
//       {/* Sidebar menu starts */}
//       <div className="sidebarMenuScroll">
//         <ul className="sidebar-menu">
//           <li>
//             <a href="/patient/dashboard">
//               <i className="ri-home-6-line" />
//               <span className="menu-text"> Dashboard</span>
//             </a>
//           </li>
//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-heart-pulse-line" />
//               <span className="menu-text">Doctors</span>
//             </a>
//             <ul className="treeview-menu">

//               <li>
//                 <a href="/patient/view-doctor">View Doctors</a>
//               </li>

//             </ul>
//           </li>
//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-nurse-line" />
//               <span className="menu-text">Dependent</span>
//             </a>
//             <ul className="treeview-menu">
//               <li>
//                 <a href="#">Add Dependent</a>
//               </li>
//               <li>
//                 <a href="#">View Dependents</a>
//               </li>
//             </ul>
//           </li>
//           <li className="treeview">
//             <a href="#!">
//               <i className="ri-dossier-line" />
//               <span className="menu-text">Appointments</span>
//             </a>
//             <ul className="treeview-menu">
//               {/* <li>
//                 <a href="#">Appointments</a>
//               </li> */}
//               <li>
//                 <a href="/view-patient-booked-appointment">Appointments List</a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a href="#">
//               <i className="ri-settings-5-line" />
//               <span className="menu-text"> Settings</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
// export default Sidebar;
