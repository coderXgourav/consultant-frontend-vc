import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";

const PatientView = () => {
  return (
    <>
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
                  Doctors Dashboard
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
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title">Patients List</h5>
                      <a href="add-patient" className="btn btn-primary ms-auto">
                        Add Patient
                      </a>
                    </div>
                    <div className="card-body">
                      {/* Table starts */}
                      <div className="table-responsive">
                        <table
                          id="basicExample"
                          className="table truncate m-0 align-middle"
                        >
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Patient Name</th>
                              <th>Gender</th>
                              <th>Age</th>
                              <th>Blood Group</th>
                              <th>Treatment</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>#89990</td>
                              <td>
                                <img
                                  src="/assets/images/patient.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Allan Stuart
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>67</td>
                              <td>O+</td>
                              <td>Diabetes</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>377 McGlynn, Orchard</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#89992</td>
                              <td>
                                <img
                                  src="/assets/images/patient1.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Katie Robinson
                              </td>
                              <td>
                                <span className="badge bg-warning-subtle text-warning">
                                  Female
                                </span>
                              </td>
                              <td>33</td>
                              <td>B+</td>
                              <td>Pediatric</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>229 Hills Courts, Doyleland</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#89995</td>
                              <td>
                                <img
                                  src="/assets/images/patient2.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Pam Higgins
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>28</td>
                              <td>AB+</td>
                              <td>Asthma</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>59 Graham Fall, Nickville</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#89345</td>
                              <td>
                                <img
                                  src="/assets/images/patient3.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Ashley Clay
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>77</td>
                              <td>A+</td>
                              <td>Chancroid</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>491 Towne Parkway</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#87690</td>
                              <td>
                                <img
                                  src="/assets/images/patient4.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Keith Coleman
                              </td>
                              <td>
                                <span className="badge bg-warning-subtle text-warning">
                                  Female
                                </span>
                              </td>
                              <td>49</td>
                              <td>O+</td>
                              <td>Diphtheria</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>289 Markus Turnpike</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#82894</td>
                              <td>
                                <img
                                  src="/assets/images/patient5.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Nick Morrow
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>69</td>
                              <td>A+</td>
                              <td>Thyroid</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>835 Lorena Stream</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#80762</td>
                              <td>
                                <img
                                  src="/assets/images/patient4.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Wendi Combs
                              </td>
                              <td>
                                <span className="badge bg-warning-subtle text-warning">
                                  Female
                                </span>
                              </td>
                              <td>28</td>
                              <td>AB+</td>
                              <td>Cyclospora</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>360 Branden Knoll</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#83308</td>
                              <td>
                                <img
                                  src="/assets/images/patient1.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Carole Dodson
                              </td>
                              <td>
                                <span className="badge bg-warning-subtle text-warning">
                                  Female
                                </span>
                              </td>
                              <td>95</td>
                              <td>A+</td>
                              <td>Conjunctivitis</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>Suite 510 Kiana Track</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#83306</td>
                              <td>
                                <img
                                  src="/assets/images/patient.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Juan Meyers
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>55</td>
                              <td>B+</td>
                              <td>Diabetes</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>6921 Geoffrey Spur</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#86345</td>
                              <td>
                                <img
                                  src="/assets/images/patient5.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Naomi Dawson
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>32</td>
                              <td>AB+</td>
                              <td>Celiac</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>352 Raynor Junction</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#83349</td>
                              <td>
                                <img
                                  src="/assets/images/patient2.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Emmitt Macias
                              </td>
                              <td>
                                <span className="badge bg-info-subtle text-info">
                                  Male
                                </span>
                              </td>
                              <td>93</td>
                              <td>A+</td>
                              <td>Cervical</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>834 Quitzon Dale Connie</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>#82348</td>
                              <td>
                                <img
                                  src="/assets/images/patient4.png"
                                  className="img-shadow img-2x rounded-5 me-1"
                                  alt="Medical Admin Template"
                                />
                                Reba Fisher
                              </td>
                              <td>
                                <span className="badge bg-warning-subtle text-warning">
                                  Female
                                </span>
                              </td>
                              <td>59</td>
                              <td>A+</td>
                              <td>Alphaviruses</td>
                              <td>0987654321</td>
                              <td>test@testing.com</td>
                              <td>806 Je Alley, Robelfurt</td>
                              <td>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delRow"
                                  >
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                  <a
                                    href="edit-patient"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Edit Patient Details"
                                  >
                                    <i className="ri-edit-box-line" />
                                  </a>
                                  <a
                                    href="patient-dashboard"
                                    className="btn btn-outline-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="View Dashboard"
                                  >
                                    <i className="ri-eye-line" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Table ends */}
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
                              Are you sure you want to delete the patient?
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default PatientView;
