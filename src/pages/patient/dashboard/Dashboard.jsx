import Sidebar from "../../../components/patient/Sidebar";
import Topbar from "../../../components/patient/Topbar";

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
                  Patients Dashboard
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
                <div className="col-sm-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex ">
                        {/* Stats starts */}
                        <div className="d-flex align-items-center flex-wrap gap-4">
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-primary rounded-5 me-2">
                              <i className="ri-account-circle-line fs-3" />
                            </div>
                            <div>
                              <h4 className="mb-1">Carole</h4>
                              <p className="m-0">Patient Name</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-primary rounded-5 me-2">
                              <i className="ri-women-line fs-3" />
                            </div>
                            <div>
                              <h4 className="mb-1">Female</h4>
                              <p className="m-0">Gender</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-primary rounded-5 me-2">
                              <i className="ri-arrow-right-up-line fs-3" />
                            </div>
                            <div>
                              <h4 className="mb-1">68</h4>
                              <p className="m-0">Patient Age</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-primary rounded-5 me-2">
                              <i className="ri-contrast-drop-2-line fs-3" />
                            </div>
                            <div>
                              <h4 className="mb-1">O+</h4>
                              <p className="m-0">Blood Type</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="icon-box lg bg-secondary rounded-5 me-2">
                              <i className="ri-stethoscope-line fs-3 text-body" />
                            </div>
                            <div>
                              <h4 className="mb-1">Dr. David</h4>
                              <p className="m-0">Consulting Doctor</p>
                            </div>
                          </div>
                        </div>
                        {/* Stats ends */}
                        <img
                          src="/assets/images/patient4.png"
                          className="img-7x rounded-circle ms-auto"
                          alt="Patient Admin Template"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xxl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="text-center">
                        <div className="icon-box md bg-danger rounded-5 m-auto">
                          <i className="ri-capsule-line fs-3" />
                        </div>
                        <div className="mt-3">
                          <h5>BP Levels</h5>
                          <p className="m-0 opacity-50">Recent five visits</p>
                        </div>
                      </div>
                      <div id="bpLevels" />
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>24/04/2024</div>
                          <div>140</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>16/04/2024</div>
                          <div>190</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>10/04/2024</div>
                          <div>230</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="text-center">
                        <div className="icon-box md bg-info rounded-5 m-auto">
                          <i className="ri-contrast-drop-2-line fs-3" />
                        </div>
                        <div className="mt-3">
                          <h5>Sugar Levels</h5>
                          <p className="m-0 opacity-50">Recent five visits</p>
                        </div>
                      </div>
                      <div id="sugarLevels" />
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>24/04/2024</div>
                          <div>140</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>16/04/2024</div>
                          <div>190</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>10/04/2024</div>
                          <div>230</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="text-center">
                        <div className="icon-box md bg-success rounded-5 m-auto">
                          <i className="ri-heart-pulse-line fs-3" />
                        </div>
                        <div className="mt-3">
                          <h5>Heart Rate</h5>
                          <p className="m-0 opacity-50">Recent five visits</p>
                        </div>
                      </div>
                      <div id="heartRate" />
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>24/04/2024</div>
                          <div>110</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>16/04/2024</div>
                          <div>120</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>10/04/2024</div>
                          <div>100</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6 col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="text-center">
                        <div className="icon-box md bg-warning rounded-5 m-auto">
                          <i className="ri-flask-line fs-3" />
                        </div>
                        <div className="mt-3">
                          <h5>Clolesterol</h5>
                          <p className="m-0 opacity-50">Recent five visits</p>
                        </div>
                      </div>
                      <div id="clolesterolLevels" />
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>24/04/2024</div>
                          <div>180</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>16/04/2024</div>
                          <div>220</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>10/04/2024</div>
                          <div>230</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                {/* <div className="col-xl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Health Insurance Claims</h5>
                    </div>
                    <div className="card-body">
                      <div id="insuranceClaims" />
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-xl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">My Medical Expenses</h5>
                    </div>
                    <div className="card-body">
                      <div id="medicalExpenses" />
                    </div>
                  </div>
                </div> */}
                <div className="col-xl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Doctor Visits</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-outer">
                        <div className="table-responsive">
                          <table className="table align-middle truncate m-0">
                            <thead>
                              <tr>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Department</th>
                                <th>Reports</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <img
                                    src="/assets/images/user1.png"
                                    className="img-3x rounded-2"
                                    alt="Medical Dashboard"
                                  />{" "}
                                  Dr. Hector
                                </td>
                                <td>20/05/2024</td>
                                <td>Dentist</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#viewReportsModal1"
                                    >
                                      View Reports
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="/assets/images/user5.png"
                                    className="img-3x rounded-2"
                                    alt="Medical Dashboard"
                                  />{" "}
                                  Dr. Mitchel
                                </td>
                                <td>20/05/2024</td>
                                <td>Urologist</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#viewReportsModal1"
                                    >
                                      View Reports
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    src="/assets/images/user3.png"
                                    className="img-3x rounded-2"
                                    alt="Medical Dashboard"
                                  />{" "}
                                  Dr. Fermin
                                </td>
                                <td>18/03/2024</td>
                                <td>Surgeon</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#viewReportsModal1"
                                    >
                                      View Reports
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Reports</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-outer">
                        <div className="table-responsive">
                          <table className="table align-middle truncate m-0">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>File</th>
                                <th>Reports Link</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <div className="icon-box md bg-primary rounded-2">
                                    <i className="ri-file-excel-2-line" />
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href="#!"
                                    className="link-primary text-truncate"
                                  >
                                    Reports 1 clinical documentation
                                  </a>
                                </td>
                                <td>May-28, 2024</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delRow"
                                    >
                                      <i className="ri-delete-bin-line" />
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <div className="icon-box md bg-primary rounded-2">
                                    <i className="ri-file-excel-2-line" />
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href="#!"
                                    className="link-primary text-truncate"
                                  >
                                    Reports 2 random files documentation
                                  </a>
                                </td>
                                <td>Mar-20, 2024</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delRow"
                                    >
                                      <i className="ri-delete-bin-line" />
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>
                                  <div className="icon-box md bg-primary rounded-2">
                                    <i className="ri-file-excel-2-line" />
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href="#!"
                                    className="link-primary text-truncate"
                                  >
                                    Reports 3 glucose level complete report
                                  </a>
                                </td>
                                <td>Feb-18, 2024</td>
                                <td>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delRow"
                                    >
                                      <i className="ri-delete-bin-line" />
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Download Report"
                                    >
                                      <i className="ri-file-download-line" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Modal Delete Row */}
              <div
                className="modal fade"
                id="delRow"
                tabIndex={-1}
                aria-labelledby="delRowLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="delRowLabel">
                        Confirm
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this report?
                    </div>
                    <div className="modal-footer">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-outline-secondary"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          No
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal View All Reports */}
              <div
                className="modal fade"
                id="viewReportsModal1"
                tabIndex={-1}
                aria-labelledby="viewReportsModalLabel1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="viewReportsModalLabel1">
                        View Reports
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      {/* Row starts */}
                      <div className="row g-3">
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Clinical Report
                            </h6>
                            <p className="m-0 small">10/05/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Dentist Report
                            </h6>
                            <p className="m-0 small">20/06/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Glucose Report
                            </h6>
                            <p className="m-0 small">30/06/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              X-ray Report
                            </h6>
                            <p className="m-0 small">26/08/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Ultrasound Report
                            </h6>
                            <p className="m-0 small">21/08/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Hypothermia Report
                            </h6>
                            <p className="m-0 small">15/04/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Discharge Report
                            </h6>
                            <p className="m-0 small">22/07/2024</p>
                          </a>
                        </div>
                        <div className="col-sm-2">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                            data-bs-target="#viewReportsModal2"
                            data-bs-toggle="modal"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Diabetes Report
                            </h6>
                            <p className="m-0 small">17/05/2024</p>
                          </a>
                        </div>
                      </div>
                      {/* Row ends */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal View Single Report */}
              <div
                className="modal fade"
                id="viewReportsModal2"
                tabIndex={-1}
                aria-labelledby="viewReportsModalLabel2"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="viewReportsModalLabel2">
                        <div className="d-flex align-items-center">
                          <a
                            href="#!"
                            className="btn btn-sm btn-outline-primary me-2"
                            data-bs-target="#viewReportsModal1"
                            data-bs-toggle="modal"
                          >
                            <i className="ri-arrow-left-wide-fill" />
                          </a>
                          Clinical Report
                        </div>
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      {/* Row starts */}
                      <div className="row g-3">
                        <div className="col-sm-12">
                          <a
                            href="#"
                            className="d-flex flex-column bg-light p-2 rounded-2 text-center"
                          >
                            <img
                              src="/assets/images/report.svg"
                              className="img-fluid rounded-2"
                              alt="Medical Dashboards"
                            />
                            <h6 className="mt-3 mb-1 text-truncate">
                              Clinical Report
                            </h6>
                            <p className="m-0 small">10/05/2024</p>
                          </a>
                        </div>
                      </div>
                      {/* Row ends */}
                    </div>
                  </div>
                </div>
              </div>
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
