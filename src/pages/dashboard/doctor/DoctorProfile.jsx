import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";

const DoctorProfile = () => {
  const [api, contextHolder] = notification.useNotification();
  const [doctor, setDoctor] = useState({
    firstName: "loading...",
    lastName: "",
  });

  const openNotification = (status, title, desc) => {
    if (status == true) {
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
  const params = useParams();
  const { doctorId } = params;
  useEffect(() => {
    fetchDoctor();
  }, [0]);

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { doctor } = res.data;
      setDoctor(doctor);
    } catch (error) {
      if (error.response.data) {
        const { status, message, desc } = error.response.data;
        openNotification(status, message, desc);
      } else {
        openNotification(false, "Incorrect Id", "Please check the doctor id");
      }
    }
  };

  return (
    <>
      <div className="page-wrapper">
        {contextHolder}
        {/* App header starts */}
        <Topbar />
        {/* App header ends */}
        {/* Main container starts */}
        <div className="main-container">
          {/* Sidebar wrapper starts */}
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
                  Doctors Profile
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
                <div className="col-xxl-6 col-sm-12">
                  <div className="card mb-3 bg-1">
                    <div className="card-body mh-230">
                      {/* Row starts */}
                      <div className="row gx-3">
                        <div className="col-sm-3">
                          <img
                            src="/assets/images/user2.png"
                            className="img-fluid rounded-3"
                            alt="Medical Dashboard"
                          />
                        </div>
                        <div className="col-sm-9">
                          <div className="text-white mt-3">
                            <h6>Hello I am,</h6>
                            <h3>
                              {doctor?.firstName + " " + doctor?.lastName}
                            </h3>
                            <h6>
                              MBBS, MS - General Surgery, General Physician
                            </h6>
                            <h6>16 Years Experience Overall</h6>
                            <div className="rating-stars">
                              <div className="readonly5" />
                            </div>
                            <div className="mt-1">2896 Reviews</div>
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
                          <h1 className="text-primary">3605</h1>
                          <h6>Patients</h6>
                          <span className="badge bg-primary">68% High</span>
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
                          <h1 className="text-danger">507</h1>
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
                            <i className="ri-star-line fs-1 text-success" />
                          </div>
                          <h1 className="text-success">2896</h1>
                          <h6>Reviews</h6>
                          <span className="badge bg-success">30% High</span>
                        </div>
                      </div>
                      {/* Card details end */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
              {/* Row starts */}
              <div className="row gx-3">
                <div className="col-xl-8 col-sm-12">
                  {/* Row starts */}
                  <div className="row gx-3">
                    <div className="col-sm-12">
                      <div className="card mb-3">
                        <div className="card-header">
                          <h5 className="card-title">About</h5>
                        </div>
                        <div className="card-body">
                          <p>
                            Dr. Jessika Linda is an eminent Endocrinologist
                            associated with med hospitals who is specially
                            trained to diagnose diseases related to glands. She
                            specialises in treating people who suffer from
                            hormonal imbalances, typically from glands in the
                            endocrine system. The most common conditions treated
                            by Dr. Linda are Diabetes, Metabolic disorders, Lack
                            of growth, Osteoporosis, Thyroid diseases, Cancers
                            of the endocrine glands, Over- or under-production
                            of hormones, Cholesterol disorders, Hypertension and
                            Infertility. Also available for consultation at Med
                            hospital. Dr. Lindas approach lies in understanding
                            patients diseases and the procedure recommended
                            along with care.
                          </p>
                          <div className="">
                            <h6>Specialized in</h6>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-primary">Diabetes</span>
                              <span className="badge bg-primary">Thyroid</span>
                              <span className="badge bg-primary">
                                Osteoporosis
                              </span>
                              <span className="badge bg-primary">Surgeon</span>
                              <span className="badge bg-primary">General</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="card mb-3">
                        <div className="card-header">
                          <h5 className="card-title">Reviews</h5>
                        </div>
                        <div className="card-body">
                          {/* Reviews starts */}
                          <div className="d-grid gap-5">
                            <div className="d-flex">
                              <img
                                src="/assets/images/patient1.png"
                                className="img-4x rounded-2"
                                alt="Medical Admin Template"
                              />
                              <div className="ms-3">
                                <span className="badge border border-primary text-primary mb-3">
                                  Excellent
                                </span>
                                <h6>Wendi Combs</h6>
                                <p className="mb-2">
                                  I am consulting with her for last 10 years and
                                  she is really good in thyroid. Her experience
                                  has greatest strength. By looking at the
                                  report she will diagnosis the problem and
                                  listen to us. We might think she is in a hurry
                                  to complete the patient but her experience
                                  makes her 100%.
                                </p>
                                <p>
                                  <i className="ri-thumb-up-line" /> I recommend
                                  the doctor.
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
                                <span className="badge border border-primary text-primary mb-3">
                                  Excellent
                                </span>
                                <h6>Nick Morrow</h6>
                                <p className="mb-2">
                                  Dr.Jessika is my physician from past four
                                  years. Till now, whatever treatment and advice
                                  she has given me is of the best kind. I am
                                  extremely satisfied with it. There may be
                                  about 10 minutes of waiting period before
                                  consultation. The hospital and staff are good
                                  as well.
                                </p>
                                <p>
                                  <i className="ri-thumb-up-line" /> I recommend
                                  the doctor.
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
                                <span className="badge border border-danger text-danger mb-3">
                                  Bad
                                </span>
                                <h6>Carole Dodson</h6>
                                <p className="mb-2">
                                  Its a not recommerded example. Its a not
                                  recommerded example. Its a not recommerded
                                  example. Its a not recommerded example.
                                </p>
                                <p>
                                  <i className="ri-thumb-down-line" /> I do not
                                  recommend the doctor.
                                </p>
                                <div className="rating-stars">
                                  <div className="readonly2" />
                                </div>
                              </div>
                            </div>
                            <div className="d-grid">
                              <button className="btn btn-primary">
                                Load More
                              </button>
                            </div>
                          </div>
                          {/* Reviews ends */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Row ends */}
                </div>
                <div className="col-xl-4 col-sm-12">
                  {/* Row starts */}
                  <div className="row gx-3">
                    <div className="col-xl-12 col-sm-6">
                      <div className="card mb-3">
                        <div className="card-header">
                          <h5 className="card-title">Avalibility</h5>
                        </div>
                        <div className="card-body">
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Mon - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Tue - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Wed - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Thu - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Fri - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Sat - 9:AM - 2:PM
                            </span>
                            <span className="p-2 lh-1 bg-light rounded-2 box-shadow">
                              Sun - NA
                            </span>
                          </div>
                          <a
                            href="book-appointment.html"
                            className="btn btn-primary"
                          >
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-sm-6">
                      <div className="card mb-3">
                        <div className="card-header">
                          <h5 className="card-title">Awards</h5>
                        </div>
                        <div className="card-body">
                          <div>
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
                  </div>
                  {/* Row ends */}
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
    </>
  );
};
export default DoctorProfile;
