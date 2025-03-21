// import Sidebar from "../../../components/doctor/Sidebar";
import Topbar from "../../../components/doctor/Topbar";
import DrSidebar from "../../../components/doctor/DrSidebar";

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
          <DrSidebar />
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
                                <h6>Good Morning,</h6>
                                <h3>Dr. Jessika Linda</h3>
                                <h6>Gynecologist, MS, MD, MBBS</h6>
                                <h5>
                                  You have total{" "}
                                  <span className="badge bg-danger">
                                    18 appointments
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
              <div className="row gx-3">
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Patients</h5>
                    </div>
                    <div className="card-body">
                      <div className="card-info bg-light lh-1">
                        20% higher than last year.
                      </div>
                      <div id="patients" />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Appointments</h5>
                    </div>
                    <div className="card-body">
                      <div className="card-info bg-light lh-1">
                        33% higher than last year.
                      </div>
                      <div id="appointments" />
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
                      <h5 className="card-title">Patient Reviews</h5>
                    </div>
                    <div className="card-body">
                      {/* Reviews starts */}
                      <div className="scroll300">
                        <div className="d-grid gap-4">
                          <div className="d-flex">
                            <img
                              src="/assets/images/patient1.png"
                              className="img-4x rounded-2"
                              alt="Medical Admin Template"
                            />
                            <div className="ms-3">
                              <h6>Wendi Combs</h6>
                              <p className="mb-2">
                                I had a very good experience here. I got a best
                                psychiatrist and a therapist. They analysed my
                                case very deeply and there medicines helped me a
                                lot.
                              </p>
                              <div className="rating-stars">
                                <div className="readonly5" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img
                              src="/assets/images/patient2.png"
                              className="img-4x rounded-2"
                              alt="Medical Admin Template"
                            />
                            <div className="ms-3">
                              <h6>Nick Morrow</h6>
                              <p className="mb-2">
                                Dr.Jessika listens to you very patiently &amp;
                                gives you sufficient time to say your problems.
                                She diagnosed in no time &amp; i was able to
                                recover quickly, not just diagnosing correctly,
                                she helped me in changing my lifestyle habits.
                              </p>
                              <div className="rating-stars">
                                <div className="readonly5" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img
                              src="/assets/images/patient3.png"
                              className="img-4x rounded-2"
                              alt="Medical Admin Template"
                            />
                            <div className="ms-3">
                              <h6>Carole Dodson</h6>
                              <p className="mb-2">
                                She is very supportive and suggest well. Good
                                surgeon known from past 10 years. My mother was
                                a renal transplant patient but in most risky
                                condition she treated her in day care procedure
                                and avoided hospital admission.
                              </p>
                              <div className="rating-stars">
                                <div className="readonly4" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img
                              src="/assets/images/patient4.png"
                              className="img-4x rounded-2"
                              alt="Medical Admin Template"
                            />
                            <div className="ms-3">
                              <h6>Ashley Clay</h6>
                              <p className="mb-2">
                                Jessika is a very good Doctor because I had good
                                experience with hee, she treated my father who
                                is a diabetic patient.
                              </p>
                              <div className="rating-stars">
                                <div className="readonly5" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <img
                              src="/assets/images/patient5.png"
                              className="img-4x rounded-2"
                              alt="Medical Admin Template"
                            />
                            <div className="ms-3">
                              <h6>Emmitt Macias</h6>
                              <p className="mb-2">
                                One of the finest doctor’s I ever met. A very
                                good human being more than a doctor.
                              </p>
                              <div className="rating-stars">
                                <div className="readonly4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Reviews ends */}
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Patients Type</h5>
                    </div>
                    <div className="card-body">
                      <div className="scroll300 auto-align-graph">
                        <div id="gender" />
                        <div className="mt-3 text-center">
                          <span className="badge bg-primary">15%</span> male
                          patients decreased than last month.
                          <span className="badge bg-danger">30%</span> female
                          patients increase than last month.
                          <span className="badge bg-warning">60%</span> kid
                          patients increase than last month.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Awards</h5>
                    </div>
                    <div className="card-body">
                      <div className="scroll300">
                        <div
                          id="carouselAwards"
                          className="carousel carousel-dark slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-indicators">
                            <button
                              type="button"
                              data-bs-target="#carouselAwards"
                              data-bs-slide-to={0}
                              className="active"
                              aria-current="true"
                              aria-label="Slide 1"
                            />
                            <button
                              type="button"
                              data-bs-target="#carouselAwards"
                              data-bs-slide-to={1}
                              aria-label="Slide 2"
                            />
                            <button
                              type="button"
                              data-bs-target="#carouselAwards"
                              data-bs-slide-to={2}
                              aria-label="Slide 3"
                            />
                          </div>
                          <div className="carousel-inner">
                            <div
                              className="carousel-item active"
                              data-bs-interval={10000}
                            >
                              <img
                                src="/assets/images/award/award.svg"
                                className="d-block w-100"
                                alt="Medical Templates"
                              />
                            </div>
                            <div
                              className="carousel-item"
                              data-bs-interval={5000}
                            >
                              <img
                                src="/assets/images/award/award1.svg"
                                className="d-block w-100"
                                alt="Medical Templates"
                              />
                            </div>
                            <div
                              className="carousel-item"
                              data-bs-interval={2500}
                            >
                              <img
                                src="/assets/images/award/award2.svg"
                                className="d-block w-100"
                                alt="Medical Templates"
                              />
                            </div>
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselAwards"
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselAwards"
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div className="text-center">
                          <h1 className="text-primary">4</h1>
                          Awards received in 2024.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Income</h5>
                    </div>
                    <div className="card-body">
                      <div className="scroll300">
                        <div id="income" />
                        <div className="mt-2 text-center">
                          <span className="badge bg-primary">22%</span> income
                          has increase that last year.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Upcoming Appontments</h5>
                    </div>
                    <div className="card-body">
                      <div className="scroll300">
                        <div className="d-flex flex-column gap-2">
                          <div className="d-flex flex-column p-3 border rounded-2">
                            <div className="d-flex align-items-center flex-row mb-3">
                              <img
                                src="/assets/images/patient.png"
                                className="img-4x rounded-5 me-3"
                                alt="Medical Dashboard"
                              />
                              <p className="m-0">Need an appointment urgent.</p>
                            </div>
                            <div className="d-flex gap-2">
                              <a
                                href="appointments-list.html"
                                className="btn btn-primary btn-sm"
                              >
                                Accept
                              </a>
                              <button className="btn btn-outline-secondary btn-sm">
                                Decline
                              </button>
                            </div>
                          </div>
                          <div className="d-flex flex-column p-3 border rounded-2">
                            <div className="d-flex align-items-center flex-row mb-3">
                              <img
                                src="/assets/images/patient1.png"
                                className="img-4x rounded-5 me-3"
                                alt="Medical Dashboard"
                              />
                              <p className="m-0">Need an appointment urgent.</p>
                            </div>
                            <div className="d-flex gap-2">
                              <a
                                href="appointments-list.html"
                                className="btn btn-primary btn-sm"
                              >
                                Accept
                              </a>
                              <button className="btn btn-outline-secondary btn-sm">
                                Decline
                              </button>
                            </div>
                          </div>
                          <div className="d-flex flex-column p-3 border rounded-2">
                            <div className="d-flex align-items-center flex-row mb-3">
                              <img
                                src="/assets/images/patient2.png"
                                className="img-4x rounded-5 me-3"
                                alt="Medical Dashboard"
                              />
                              <p className="m-0">Need an appointment urgent.</p>
                            </div>
                            <div className="d-flex gap-2">
                              <a
                                href="appointments-list.html"
                                className="btn btn-primary btn-sm"
                              >
                                Accept
                              </a>
                              <button className="btn btn-outline-secondary btn-sm">
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Surgeries</h5>
                    </div>
                    <div className="card-body">
                      <div className="scroll300 auto-align-graph">
                        <div id="surgeries" />
                        <div className="mt-2 text-center">
                          <span className="badge bg-primary">22%</span> male
                          patients decreased than last month.
                          <span className="badge bg-danger">38%</span> female
                          patients increase than last month.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
