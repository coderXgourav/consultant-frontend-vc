// import { notification } from "antd";
// import { postAPI } from "../../API/commonAPI";

const Sidebar = () => {
  //   const [api, contextHolder] = notification.useNotification();

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
  //   const logoutHandler = async () => {
  //     const result = await postAPI("logout", { name: "logout" });
  //     localStorage.removeItem("token");
  //     const { status, message, desc } = result;
  //     if (status) {
  //       openNotification(status, message, desc);
  //       setTimeout(() => {
  //         location.href = "/";
  //       }, 1000);
  //     } else {
  //       openNotification(status, message, desc);
  //     }
  //   };
  return (
    <nav id="sidebar" className="sidebar-wrapper">
      {/* {contextHolder} */}
      {/* Sidebar profile starts */}
      <div className="sidebar-profile">
        <img
          src="/assets/images/user6.png"
          className="img-shadow img-3x me-3 rounded-5"
          alt="Hospital Admin Templates"
        />
        <div className="m-0">
          <h5 className="mb-1 profile-name text-nowrap text-truncate">
            Nick Gonzalez
          </h5>
          <p className="m-0 small profile-name text-nowrap text-truncate">
            Appointment Manager
          </p>
        </div>
      </div>
      {/* Sidebar profile ends */}
      {/* Sidebar menu starts */}
      <div className="sidebarMenuScroll">
        <ul className="sidebar-menu">
          <li>
            <a href="/appointment-manager/dashboard">
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
              {/* <li>
                     <a href="patient-dashboard">Patients Dashboard</a>
                 </li> */}
              <li>
                <a href="#">Patients List</a>
              </li>
              {/* <li>
                     <a href="add-patient">Add Patient</a>
                 </li> */}
              {/* <li>
                     <a href="edit-patient">Edit Patient Details</a>
                 </li> */}
            </ul>
          </li>
          {/* <li className="treeview">
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
          </li> */}
          <li className="treeview">
            <a href="#!">
              <i className="ri-dossier-line" />
              <span className="menu-text">Appointments</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="#">Appointments</a>
              </li>
              <li>
                <a href="#">Appointments List</a>
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
export default Sidebar;
