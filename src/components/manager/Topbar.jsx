// import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { notification } from "antd";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { postAPI } from "../../API/commonAPI";

const Topbar = () => {
  useEffect(() => {
    const token = localStorage.getItem("managerToken");
    if (!token) {
      location.href = "/appointment-manager/login";
    } else {
      const decode = jwtDecode(token);
      if (!decode) {
        location.href = "/appointment-manager/login";
      }
    }
  }, [0]);
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
    localStorage.removeItem("managerToken");
    window.location = "/appointment-manager/login";
    // const result = await postAPI("logout", { name: "logout" });
    // localStorage.removeItem("token");

    // const { status, message, desc } = result;
    // if (status) {
    //   openNotification(status, message, desc);
    //   setTimeout(() => {
    //     location.href = "/";
    //   }, 1000);
    // } else {
    //   openNotification(status, message, desc);
    // }
  };
  return (
    <>
      <Helmet>
        <title>Doctor Consultant</title>
        <script src="/assets/js/jquery.min.js"></script>
        <script src="/assets/vendor/apex/custom/home/available-beds.js"></script>
        <script src="/assets/vendor/apex/custom/home/earnings.js"></script>
        <script src="/assets/vendor/apex/custom/home/gender-age.js"></script>
        <script src="/assets/vendor/apex/custom/home/claims.js"></script>
        <script src="/assets/js/custom.js"></script>
      </Helmet>

      <div className="app-header d-flex align-items-center">
        {contextHolder}
        {/* Toggle buttons starts */}
        <div className="d-flex">
          <button className="toggle-sidebar">
            <i className="ri-menu-line" />
          </button>
          <button className="pin-sidebar">
            <i className="ri-menu-line" />
          </button>
        </div>
        {/* Toggle buttons ends */}
        {/* App brand starts */}
        <div className="app-brand ms-3 bg-light">
          <a href="/" className="d-lg-block d-none">
            {/* <img
              src="https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg"
              className="logo"
              alt="Medicare Admin Template"
            /> */}
          </a>
          <a href="/" className="d-lg-none d-md-block">
            <img
              src="/assets/images/logo-sm.svg"
              className="logo"
              alt="Medicare Admin Template"
            />
          </a>
        </div>
        {/* App brand ends */}
        {/* App header actions starts */}
        <div className="header-actions">
          {/* Search container starts */}
          <div className="search-container d-lg-block d-none mx-3">
            <input
              type="text"
              className="form-control"
              id="searchId"
              placeholder="Search"
            />
            <i className="ri-search-line" />
          </div>
          {/* Search container ends */}
          {/* Header actions starts */}
          <div className="d-lg-flex d-none gap-2">
            {/* Select country dropdown starts */}

            {/* Notifications dropdown ends */}
            {/* Messages dropdown starts */}
            <div className="dropdown">
              <a
                className="dropdown-toggle header-icon"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ri-message-3-line" />
                <span className="count-label" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-300">
                <h5 className="fw-semibold px-3 py-2 text-primary">Messages</h5>
                {/* Scroll starts */}
                <div className="scroll300">
                  {/* Messages list starts */}
                  <div className="p-3">
                    <div className="d-flex py-2">
                      <img
                        src="/assets/images/user3.png"
                        className="img-shadow img-3x me-3 rounded-5"
                        alt="Hospital Admin Templates"
                      />
                      <div className="m-0">
                        <h6 className="mb-1 fw-semibold">Nick Gonzalez</h6>
                        <p className="mb-1">
                          Appointed as a new President 2014-2025
                        </p>
                        <p className="small m-0 opacity-50">Today, 07:30pm</p>
                      </div>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        src="/assets/images/user1.png"
                        className="img-shadow img-3x me-3 rounded-5"
                        alt="Hospital Admin Templates"
                      />
                      <div className="m-0">
                        <h6 className="mb-1 fw-semibold">Clyde Fowler</h6>
                        <p className="mb-1">Congratulate, James for new job.</p>
                        <p className="small m-0 opacity-50">Today, 08:00pm</p>
                      </div>
                    </div>
                    <div className="d-flex py-2">
                      <img
                        src="/assets/images/user4.png"
                        className="img-shadow img-3x me-3 rounded-5"
                        alt="Hospital Admin Templates"
                      />
                      <div className="m-0">
                        <h6 className="mb-1 fw-semibold">Sophie Michiels</h6>
                        <p className="mb-1">
                          Lewis added new doctors training schedule.
                        </p>
                        <p className="small m-0 opacity-50">Today, 09:30pm</p>
                      </div>
                    </div>
                  </div>
                  {/* Messages list ends */}
                </div>
                {/* Scroll ends */}
                {/* View all button starts */}
                <div className="d-grid m-3">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    View all
                  </a>
                </div>
                {/* View all button ends */}
              </div>
            </div>
          </div>
          {/* Header actions ends */}
          {/* Header user settings starts */}
          <div className="dropdown ms-2">
            <a
              id="userSettings"
              className="dropdown-toggle d-flex align-items-center"
              href="#!"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="avatar-box">
                JB
                <span className="status busy" />
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end shadow-lg">
              <div className="px-3 py-2">
                <span className="small">Admin</span>
                <h6 className="m-0">James Bruton</h6>
              </div>
              <div className="mx-3 my-2 d-grid">
                <a href="#" onClick={logoutHandler} className="btn btn-danger">
                  Logout
                </a>
              </div>
            </div>
          </div>
          {/* Header user settings ends */}
        </div>
        {/* App header actions ends */}
      </div>
    </>
  );
};

export default Topbar;
