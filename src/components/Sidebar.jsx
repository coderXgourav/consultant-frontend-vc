import { notification } from "antd";
import { postAPI } from "../API/commonAPI";

const Sidebar = () => {
  const [api, contextHolder] = notification.useNotification();

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
  const logoutHandler = async () => {
    const result = await postAPI("logout", { name: "logout" });
    localStorage.removeItem("token");
    const { status, message, desc } = result;
    if (status) {
      openNotification(status, message, desc);
      setTimeout(() => {
        location.href = "/";
      }, 1000);
    } else {
      openNotification(status, message, desc);
    }
  };
  return (
    <nav id="sidebar" className="sidebar-wrapper">
      {contextHolder}
      {/* Sidebar profile starts */}
      <div className="sidebar-profile">
        <img
          src="/assets/images/user6.png"
          className="img-shadow img-3x me-3 rounded-5"
          alt="Hospital Admin Templates"
        />
        <div className="m-0">
          <h5 className="mb-1 profile-name text-nowrap text-truncate">
            ADMIN
          </h5>
          <p className="m-0 small profile-name text-nowrap text-truncate">
            Dept Admin
          </p>
        </div>
      </div>
      {/* Sidebar profile ends */}
      {/* Sidebar menu starts */}
      <div className="sidebarMenuScroll">
        <ul className="sidebar-menu">
          <li className="active current-page">
            <a href="/dashboard">
              <i className="ri-home-6-line" />
              <span className="menu-text"> Dashboard</span>
            </a>
          </li>

          <li className="treeview">
            <a href="javascript:void(0)">
              <i className="ri-stethoscope-line" />
              <span className="menu-text">Doctors</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/view-doctors">View Doctors</a>
              </li>
              <li>
                <a href="/add-doctor">Add Doctor</a>
              </li>
              <li>
                <a href="/upload-dicom-file">Upload DICOM file</a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-heart-pulse-line" />
              <span className="menu-text">Patients</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/view-patients">Patients List</a>
              </li>
              <li>
                <a href="/add-patient">Add Patient</a>
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
                <a href="/admin-appointment">Appointments</a>
              </li>
              <li>
                <a href="/admin-appointment-list">Appointments List</a>
              </li>
              <li>
                <a href="/admin-book-appointment">Book Appointment</a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-building-2-line" />
              <span className="menu-text">Departments</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/view-department">Departments List</a>
              </li>
              <li>
                <a href="/add-department">Add Department</a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#!">
              <i className="ri-secure-payment-line" />
              <span className="menu-text">Payments</span>
            </a>
            <ul className="treeview-menu">
            <li>
                <a href="/admin-payments">Payments Summary</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="settings.html">
              <i className="ri-settings-5-line" />
              <span className="menu-text"> Settings</span>
            </a>
          </li>
          <li onClick={logoutHandler}>
            <a href="javascript:void(0)">
              <i className="ri-settings-5-line" />
              <span className="menu-text"> Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;
