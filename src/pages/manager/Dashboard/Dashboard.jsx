import Sidebar from "../../../components/manager/Sidebar";
import Topbar from "../../../components/manager/Topbar";

const Dashboard = () => {
  return (
    <>
      {/* Loading ends */}
      {/* Page wrapper starts */}
      <div className="page-wrapper">
        {/* TOPBAR  */}
        <Topbar />

        {/* Main container starts */}
        <div className="main-container">
          {/* Sidebar wrapper starts */}
          {/* SIDE BAR  */}
          <Sidebar />
          {/* Sidebar wrapper ends */}
          {/* App container starts */}
          <div className="app-container">
            {/* App hero header starts */}
            <div className="app-hero-header d-flex align-items-center">
              {/* Breadcrumb starts */}
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                  <a href="#">Home</a>
                </li>
                <li
                  className="breadcrumb-item text-primary"
                  aria-current="page"
                >
                  Appointment Manager Dashboard
                </li>
              </ol>
              {/* Breadcrumb ends */}
              {/* Sales stats starts */}
             
              {/* Sales stats ends */}
            </div>
            {/* App Hero header ends */}
            {/* App body starts */}
            <div className="app-body">
              {/* Row starts */}
              <div className="row">
                <div className="col-12 mt-4">
                  {/* Row starts */}
                  <div className="row gx-3">
                    <div className="col-xxl-6 col-sm-12">
                      <div className="card mb-3 bg-1">
                        <div className="card-body mh-230">
                          {/* Row starts */}
                          <div className="row gx-3">
                            <div className="col-sm-3">
                              <img
                                src="/assets/images/doctor.svg"
                                className="img-230 mt-n5"
                                alt="Medical Dashboard"
                              />
                            </div>
                            <div className="col-sm-9">
                              <div className="text-white mt-3">
                                <h6>Welcome again,</h6>
                                <h3>Jessika Linda</h3>

                                <h6>Cardiologist, MD, FACC</h6>
                                <h5>
                                  You have total{" "}
                                  <span className="badge bg-warning">
                                    12 appointments
                                  </span>
                                  today.
                                </h5>
                                <div className="rating-stars">
                                  <div className="readonly5" />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Row ends */}
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-sm-4">
                      <div className="card mb-3">
                        <div className="card-body mh-230">
                          {/* Card details start */}
                          <div>
                            <div className="d-flex flex-column align-items-center">
                              <div className="icon-box xl bg-primary-subtle rounded-5 mb-2 no-shadow">
                                <i className="ri-empathize-line fs-1 text-primary" />
                              </div>
                              <h1 className="text-primary">3809</h1>
                              <h6>Patients</h6>
                              <span className="badge bg-primary">40% High</span>
                            </div>
                          </div>
                          {/* Card details end */}
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-sm-4">
                      <div className="card mb-3">
                        <div className="card-body mh-230">
                          {/* Card details start */}
                          <div>
                            <div className="d-flex flex-column align-items-center">
                              <div className="icon-box xl bg-danger-subtle rounded-5 mb-2 no-shadow">
                                <i className="ri-lungs-line fs-1 text-danger" />
                              </div>
                              <h1 className="text-danger">906</h1>
                              <h6>Surgeries</h6>
                              <span className="badge bg-danger">26% High</span>
                            </div>
                          </div>
                          {/* Card details end */}
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-sm-4">
                      <div className="card mb-3">
                        <div className="card-body mh-230">
                          {/* Card details start */}
                          <div>
                            <div className="d-flex flex-column align-items-center">
                              <div className="icon-box xl bg-success-subtle rounded-5 mb-2 no-shadow">
                                <i className="ri-money-dollar-circle-line fs-1 text-success" />
                              </div>
                              <h1 className="text-success">$986K</h1>
                              <h6>Earnings</h6>
                              <span className="badge bg-success">30% High</span>
                            </div>
                          </div>
                          {/* Card details end */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Row ends */}
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
             
              {/* Row ends */}
            </div>
            {/* App body ends */}
            {/* App footer starts */}
            <div className="app-footer bg-white">
              <span>© Kyptronix 2024</span>
            </div>
            {/* App footer ends */}
          </div>

          {/* App container ends */}
        </div>
        {/* Main container ends */}
      </div>
      {/* Page wrapper ends */}
      {/* *************
       ************ JavaScript Files *************
       ************* */}
      {/* Required jQuery first, then Bootstrap Bundle JS */}
      {/* *************
       ************ Vendor Js Files *************
       ************* */}
      {/* Overlay Scroll JS */}
      {/* Apex Charts */}
      {/* Custom JS files */}
    </>
  );
};

export default Dashboard;
