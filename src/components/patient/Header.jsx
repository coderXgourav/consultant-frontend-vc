const Header = () => {
  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper">
        {/* Sidebar profile starts */}
        <div className="sidebar-profile">
          <img
            src="/assets/images/user6.png"
            className="img-shadow img-3x me-3 rounded-5"
            alt="Hospital Admin Templates"
          />
          <div className="m-0">
            <h5 className="mb-1 profile-name text-nowrap text-truncate">
              Dr. Gourav
            </h5>
            <p className="m-0 small profile-name text-nowrap text-truncate">
              Pathology
            </p>
          </div>
        </div>
        {/* Sidebar profile ends */}
        {/* Sidebar menu starts */}
        <div className="sidebarMenuScroll">
          <ul className="sidebar-menu">
            <li>
              <a href="index">
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
                  <a href="patients-list">Patients List</a>
                </li>
                {/* <li>
                     <a href="add-patient">Add Patient</a>
                 </li> */}
                {/* <li>
                     <a href="edit-patient">Edit Patient Details</a>
                 </li> */}
              </ul>
            </li>
            <li className="treeview">
              <a href="#!">
                <i className="ri-nurse-line" />
                <span className="menu-text">Staff</span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="staff">Staff List</a>
                </li>
                <li>
                  <a href="add-staff">Add Staff</a>
                </li>
                {/* <li>
                     <a href="edit-staff">Edit Staff Details</a>
                 </li> */}
              </ul>
            </li>
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
            <li className="treeview">
              <a href="#!">
                <i className="ri-dossier-line" />
                <span className="menu-text">Demo Meeting</span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="#">Join Meeting</a>
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
        {/* Sidebar menu ends */}
        {/* Sidebar contact starts */}
        <div className="sidebar-contact">
          <p className="fw-light mb-1 text-nowrap text-truncate">
            Emergency Contact
          </p>
          <h5 className="m-0 lh-1 text-nowrap text-truncate">0987654321</h5>
          <i className="ri-phone-line" />
        </div>
        {/* Sidebar contact ends */}
      </nav>
      ;
    </>
  );
};

export default Header;
