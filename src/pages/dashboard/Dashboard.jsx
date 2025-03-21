import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Dashboard = () => {
  return (
    <>
      {/* Loading starts */}
      {/* <div id="loading-wrapper">
        <div className="spin-wrapper">
          <div className="spin">
            <div className="inner" />
          </div>
          <div className="spin">
            <div className="inner" />
          </div>
          <div className="spin">
            <div className="inner" />
          </div>
          <div className="spin">
            <div className="inner" />
          </div>
          <div className="spin">
            <div className="inner" />
          </div>
          <div className="spin">
            <div className="inner" />
          </div>
        </div>
      </div> */}
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
                  <a href="index-2.html">Home</a>
                </li>
                <li
                  className="breadcrumb-item text-primary"
                  aria-current="page"
                >
                  Dashboard
                </li>
              </ol>
              {/* Breadcrumb ends */}
              {/* Sales stats starts */}
              <div className="ms-auto d-lg-flex d-none flex-row">
                <div className="d-flex flex-row gap-1 day-sorting">
                  <button className="btn btn-sm btn-primary">Today</button>
                  <button className="btn btn-sm">7d</button>
                  <button className="btn btn-sm">2w</button>
                  <button className="btn btn-sm">1m</button>
                  <button className="btn btn-sm">3m</button>
                  <button className="btn btn-sm">6m</button>
                  <button className="btn btn-sm">1y</button>
                </div>
              </div>
              {/* Sales stats ends */}
            </div>
            {/* App Hero header ends */}
            {/* App body starts */}
            <div className="app-body">
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xxl-12 col-sm-12">
                  <div className="card mb-3 bg-2">
                    <div className="card-body">
                      <div className="py-4 px-3 text-white">
                        <h6>Good Morning,</h6>
                        <h2>Dr. Patrick Kim</h2>
                        <h5>Your schedule today.</h5>
                        <div className="mt-4 d-flex gap-3">
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-arctic rounded-3 me-3">
                              <i className="ri-surgical-mask-line fs-4" />
                            </div>
                            <div className="d-flex flex-column">
                              <h2 className="m-0 lh-1">9201</h2>
                              <p className="m-0">Patients</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-lime rounded-3 me-3">
                              <i className="ri-lungs-line fs-4" />
                            </div>
                            <div className="d-flex flex-column">
                              <h2 className="m-0 lh-1">310</h2>
                              <p className="m-0">Doctors</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-peach rounded-3 me-3">
                              <i className="ri-walk-line fs-4" />
                            </div>
                            <div className="d-flex flex-column">
                              <h2 className="m-0 lh-1">221</h2>
                              <p className="m-0">Appoinments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="p-2 border border-success rounded-circle me-3">
                          <div className="icon-box md bg-success-subtle rounded-5">
                            <i className="ri-surgical-mask-line fs-4 text-success" />
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <h2 className="lh-1">890</h2>
                          <p className="m-0">New Patients</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-1">
                        <a className="text-success" href="javascript:void(0);">
                          <span>View All</span>
                          <i className="ri-arrow-right-line text-success ms-1" />
                        </a>
                        <div className="text-end">
                          <p className="mb-0 text-success">+40%</p>
                          <span className="badge bg-success-subtle text-success small">
                            this month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="p-2 border border-primary rounded-circle me-3">
                          <div className="icon-box md bg-primary-subtle rounded-5">
                            <i className="ri-lungs-line fs-4 text-primary" />
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <h2 className="lh-1">360</h2>
                          <p className="m-0">New Doctors</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-1">
                        <a className="text-primary" href="javascript:void(0);">
                          <span>View All</span>
                          <i className="ri-arrow-right-line ms-1" />
                        </a>
                        <div className="text-end">
                          <p className="mb-0 text-primary">+30%</p>
                          <span className="badge bg-primary-subtle text-primary small">
                            this month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="p-2 border border-danger rounded-circle me-3">
                          <div className="icon-box md bg-danger-subtle rounded-5">
                            <i className="ri-microscope-line fs-4 text-danger" />
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <h2 className="lh-1">980</h2>
                          <p className="m-0">Appoinments</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-1">
                        <a className="text-danger" href="javascript:void(0);">
                          <span>View All</span>
                          <i className="ri-arrow-right-line ms-1" />
                        </a>
                        <div className="text-end">
                          <p className="mb-0 text-danger">+60%</p>
                          <span className="badge bg-danger-subtle text-danger small">
                            this month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="p-2 border border-warning rounded-circle me-3">
                          <div className="icon-box md bg-warning-subtle rounded-5">
                            <i className="ri-money-dollar-circle-line fs-4 text-warning" />
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <h2 className="lh-1">$98000</h2>
                          <p className="m-0">Total Earnings</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-1">
                        <a className="text-warning" href="javascript:void(0);">
                          <span>View All</span>
                          <i className="ri-arrow-right-line ms-1" />
                        </a>
                        <div className="text-end">
                          <p className="mb-0 text-warning">+20%</p>
                          <span className="badge bg-warning-subtle text-warning small">
                            this month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-verified-badge-line fs-4 lh-1" />
                        </div>
                        <h6>Appointments</h6>
                        <h2 className="text-primary m-0">639</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-stethoscope-line fs-4 lh-1" />
                        </div>
                        <h6>Doctors</h6>
                        <h2 className="text-primary m-0">83</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-psychotherapy-line fs-4 lh-1" />
                        </div>
                        <h6>Lorem</h6>
                        <h2 className="text-primary m-0">296</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-lungs-line fs-4 lh-1" />
                        </div>
                        <h6>Lorem ipsum</h6>
                        <h2 className="text-primary m-0">49</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-hotel-bed-line fs-4 lh-1" />
                        </div>
                        <h6>Lorem Ipsum</h6>
                        <h2 className="text-primary m-0">372</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center">
                        <div className="icon-box md rounded-5 bg-primary mb-3">
                          <i className="ri-walk-line fs-4 lh-1" />
                        </div>
                        <h6>lorem ipsum</h6>
                        <h2 className="text-primary m-0">253</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Patients</h5>
                    </div>
                    <div className="card-body">
                      <div id="patients" />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Treatment Type</h5>
                    </div>
                    <div className="card-body">
                      <div id="treatment" />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Hospital Earnings</h5>
                    </div>
                    <div className="card-body">
                      {/* Row start */}
                      <div className="row g-3">
                        <div className="col-sm-6 col-12">
                          <div className="border rounded-2 d-flex align-items-center flex-row p-2">
                            <div className="me-2">
                              <div id="sparkline1" />
                            </div>
                            <div className="m-0">
                              <div className="d-flex align-items-center">
                                <h4 className="m-0 fw-bold">$4900</h4>
                                <div className="ms-2 text-primary d-flex">
                                  <small>20%</small>{" "}
                                  <i className="ri-arrow-right-up-line ms-1 fw-bold" />
                                </div>
                              </div>
                              <small>Online Consultation</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="border rounded-2 d-flex align-items-center flex-row p-2">
                            <div className="me-2">
                              <div id="sparkline2" />
                            </div>
                            <div className="m-0">
                              <div className="d-flex align-items-center">
                                <div className="fs-4 fw-bold">$750</div>
                                <div className="ms-2 text-danger d-flex">
                                  <small>26%</small>{" "}
                                  <i className="ri-arrow-right-down-line ms-1 fw-bold" />
                                </div>
                              </div>
                              <small className="text-dark">
                                Overall Purchases
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="border rounded-2 d-flex align-items-center flex-row p-2">
                            <div className="me-2">
                              <div id="sparkline3" />
                            </div>
                            <div className="m-0">
                              <div className="d-flex align-items-center">
                                <div className="fs-4 fw-bold">$560</div>
                                <div className="ms-2 text-primary d-flex">
                                  <small>28%</small>{" "}
                                  <i className="ri-arrow-right-up-line ms-1 fw-bold" />
                                </div>
                              </div>
                              <small className="text-dark">
                                Pending Invoices
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="border rounded-2 d-flex align-items-center flex-row p-2">
                            <div className="me-2">
                              <div id="sparkline4" />
                            </div>
                            <div className="m-0">
                              <div className="d-flex align-items-center">
                                <div className="fs-4 fw-bold">$390</div>
                                <div className="ms-2 text-primary d-flex">
                                  <small>30%</small>{" "}
                                  <i className="ri-arrow-right-up-line ms-1 fw-bold" />
                                </div>
                              </div>
                              <small className="text-dark">
                                Monthly Billing
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Row ends */}
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Insurance Claims</h5>
                    </div>
                    <div className="card-body">
                      <div id="claims" />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Patients by Gender</h5>
                    </div>
                    <div className="card-body">
                      <div className="auto-align-graph">
                        <div id="genderAge" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
            </div>
            {/* App body ends */}
            {/* App footer starts */}

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
