

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, Spin, Tag, Row, Col } from "antd";
// import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
// import { FaUserMd, FaClock, FaCheckCircle } from "react-icons/fa";
// import Topbar from "../../../components/patient/Topbar";
// import Sidebar from "../../../components/patient/Sidebar";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

// const ViewDoctorProfileByPatient = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchDoctor = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/patient/get-doctor-by-patient/${doctorId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
//           },
//         }
//       );
//       if (response.data.status) {
//         setDoctor(response.data.doctor);
//       } else {
//         console.error("Doctor not found:", response.data.desc);
//       }
//     } catch (error) {
//       console.error("Error fetching doctor:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctor();
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!doctor) {
//     return <h4 className="text-center text-danger mt-5">Doctor not found!</h4>;
//   }

//   const {
//     firstName,
//     lastName,
//     email,
//     mobile,
//     experience,
//     qualifications,
//     license,
//     specialization,
//     schedule,
//     status,
//     timeZone,
//     profilePhoto, // Added to destructure profilePhoto
//   } = doctor;

//   return (
//     <div className="page-wrapper">
//       <Topbar />
//       <div className="main-container">
//         <Sidebar />
//         <div className="app-container">
//           <div className="app-hero-header d-flex align-items-center">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <a href="/">Home</a>
//               </li>
//               <li className="breadcrumb-item">
//                 <a href="/patient/doctors-list">Doctors List</a>
//               </li>
//               <li className="breadcrumb-item text-primary">Doctor Profile</li>
//             </ol>
//           </div>
//           <div className="app-body py-4">
//             <Row justify="center">
//               <Col xs={24} sm={22} md={20} lg={18}>
//                 <Card
//                   className="profile-card"
//                   style={{
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                     borderRadius: "15px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {/* Header Section with Background */}
//                   <div
//                     className="profile-header"
//                     style={{
//                       background:
//                         "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
//                       margin: "-24px -24px 0",
//                       padding: "40px 24px",
//                       color: "white",
//                     }}
//                   >
//                     <Row gutter={24} align="middle">
//                       <Col xs={24} sm={8} md={6}>
//                         <div style={{ textAlign: "center" }}>
//                           {profilePhoto ? (
//                             <img
//                               src={`${import.meta.env.VITE_API_URL}${profilePhoto}`}
//                               className="img-shadow"
//                               alt={`${firstName} ${lastName || ""}`}
//                               style={{
//                                 width: "150px",
//                                 height: "150px",
//                                 borderRadius: "50%",
//                                 border: "4px solid white",
//                                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                               }}
//                               onError={(e) => (e.target.src = "/assets/images/patient.png")} // Fallback to static image
//                             />
//                           ) : (
//                             <AccountCircleIcon
//                               style={{
//                                 fontSize: "150px",
//                                 color: "white",
//                                 border: "4px solid white",
//                                 borderRadius: "50%",
//                                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                               }}
//                             />
//                           )}
//                         </div>
//                       </Col>
//                       <Col xs={24} sm={16} md={18}>
//                         <div style={{ paddingLeft: "20px" }}>
//                           <h2 className="mb-1" style={{ color: "white" }}>
//                             Dr. {firstName} {lastName}
//                           </h2>
//                           <h4 style={{ color: "rgba(255,255,255,0.9)" }}>
//                             {specialization?.department || "N/A"}
//                           </h4>
//                           <Tag
//                             color={status === "active" ? "#52c41a" : "#f5222d"}
//                             style={{
//                               padding: "5px 15px",
//                               borderRadius: "15px",
//                               marginTop: "10px",
//                             }}
//                           >
//                             <FaCheckCircle /> {status.toUpperCase()}
//                           </Tag>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>

//                   {/* Info Cards Section */}
//                   <div style={{ padding: "30px 0" }}>
//                     <Row gutter={[24, 24]}>
//                       {/* Contact Information */}
//                       <Col xs={24} md={12}>
//                         <Card title="Contact Information" bordered={false}>
//                           <p className="d-flex align-items-center">
//                             <HiOutlineMail
//                               style={{
//                                 fontSize: "20px",
//                                 marginRight: "10px",
//                                 color: "#1890ff",
//                               }}
//                             />
//                             {email}
//                           </p>
//                           <p className="d-flex align-items-center">
//                             <HiOutlinePhone
//                               style={{
//                                 fontSize: "20px",
//                                 marginRight: "10px",
//                                 color: "#52c41a",
//                               }}
//                             />
//                             {mobile}
//                           </p>
//                         </Card>
//                       </Col>

//                       {/* Professional Details */}
//                       <Col xs={24} md={12}>
//                         <Card title="Professional Details" bordered={false}>
//                           <p>
//                             <strong>Experience:</strong> {experience} years
//                           </p>
//                           <p>
//                             <strong>Qualifications:</strong> {qualifications}
//                           </p>
//                           <p>
//                             <strong>License No.:</strong> {license}
//                           </p>
//                           <p>
//                             <strong>Time Zone:</strong> {timeZone}
//                           </p>
//                         </Card>
//                       </Col>
//                     </Row>

//                     {/* Schedule Section */}
//                     <Card
//                       title={
//                         <span>
//                           <FaClock
//                             style={{ marginRight: "10px", color: "#faad14" }}
//                           />
//                           Weekly Schedule
//                         </span>
//                       }
//                       style={{ marginTop: "24px" }}
//                       bordered={false}
//                     >
//                       <Row gutter={[16, 16]}>
//                         {Object.entries(schedule).map(([day, slots]) => (
//                           <Col key={day} xs={24} sm={12} md={8}>
//                             <Card
//                               size="small"
//                               title={day.toUpperCase()}
//                               style={{
//                                 background:
//                                   slots.length > 0 ? "#f6ffed" : "#fff1f0",
//                               }}
//                             >
//                               {slots.length > 0 ? (
//                                 slots.map((slot, index) => (
//                                   <Tag
//                                     key={index}
//                                     color="success"
//                                     style={{
//                                       margin: "2px",
//                                       padding: "4px 8px",
//                                     }}
//                                   >
//                                     {slot.start} - {slot.end}
//                                   </Tag>
//                                 ))
//                               ) : (
//                                 <Tag color="error">Not Available</Tag>
//                               )}
//                             </Card>
//                           </Col>
//                         ))}
//                       </Row>
//                     </Card>
//                   </div>

//                   {/* Book Appointment Button */}
//                   <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <button
//                       className="btn btn-primary btn-lg"
//                       onClick={() => navigate(`/book-appointment/${doctorId}`)}
//                       style={{
//                         padding: "12px 40px",
//                         borderRadius: "30px",
//                         fontWeight: "bold",
//                         boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                       }}
//                     >
//                       Book Appointment
//                     </button>
//                   </div>
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewDoctorProfileByPatient;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spin, Tag, Row, Col, Rate, Avatar, Divider, Button, Form, Input, Modal } from "antd";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaUserMd, FaClock, FaCheckCircle, FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Topbar from "../../../components/patient/Topbar";
import Sidebar from "../../../components/patient/Sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const { TextArea } = Input;

const ViewDoctorProfileByPatient = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch doctor data
  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/patient/get-doctor-by-patient/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
          },
        }
      );
      if (response.data.status) {
        setDoctor(response.data.doctor);
      } else {
        console.error("Doctor not found:", response.data.desc);
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews (simulated for now)
  const fetchReviews = async () => {
    // This would be an actual API call in production
    // For now, we'll simulate some reviews
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          patientName: "John Smith",
          rating: 5,
          date: "2025-03-10",
          comment: "Dr. Miller is exceptional! Very attentive and took time to explain everything thoroughly. I felt comfortable and well-cared for throughout my appointment.",
          avatar: null,
        },
        {
          id: 2,
          patientName: "Sarah Johnson",
          rating: 4,
          date: "2025-03-05",
          comment: "Great experience overall. Dr. Miller was knowledgeable and professional. The only reason for 4 stars is the wait time was a bit longer than expected.",
          avatar: null,
        },
        {
          id: 3,
          patientName: "Michael Lee",
          rating: 5,
          date: "2025-02-28",
          comment: "I've been seeing Dr. Miller for years, and I'm always impressed with the level of care. Highly recommended for anyone looking for a specialist in this field!",
          avatar: null,
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    fetchDoctor();
    fetchReviews();
  }, []);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Handle review submission
  const handleSubmitReview = (values) => {
    const newReview = {
      id: reviews.length + 1,
      patientName: "You", // In a real app, get from patient profile
      rating: values.rating,
      date: new Date().toISOString().split('T')[0],
      comment: values.comment,
      avatar: null,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewModal(false);
    form.resetFields();

    // In a real app, you would POST this to your API
    console.log("Submitting review:", newReview);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin size="large" />
      </div>
    );
  }

  if (!doctor) {
    return <h4 className="text-center text-danger mt-5">Doctor not found!</h4>;
  }

  const {
    firstName,
    lastName,
    email,
    mobile,
    experience,
    qualifications,
    license,
    specialization,
    schedule,
    status,
    timeZone,
    profilePhoto,
  } = doctor;

  return (
    <div className="page-wrapper">
      <Topbar />
      <div className="main-container">
        <Sidebar />
        <div className="app-container">
          <div className="app-hero-header d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/patient/doctors-list">Doctors List</a>
              </li>
              <li className="breadcrumb-item text-primary">Doctor Profile</li>
            </ol>
          </div>
          <div className="app-body py-4">
            <Row justify="center">
              <Col xs={24} sm={22} md={20} lg={18}>
                <Card
                  className="profile-card"
                  style={{
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Section with Background */}
                  <div
                    className="profile-header"
                    style={{
                      background:
                        "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                      margin: "-24px -24px 0",
                      padding: "40px 24px",
                      color: "white",
                    }}
                  >
                    <Row gutter={24} align="middle">
                      <Col xs={24} sm={8} md={6}>
                        <div style={{ textAlign: "center" }}>
                          {profilePhoto ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${profilePhoto}`}
                              className="img-shadow"
                              alt={`${firstName} ${lastName || ""}`}
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                border: "4px solid white",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                              }}
                              onError={(e) => (e.target.src = "/assets/images/patient.png")}
                            />
                          ) : (
                            <AccountCircleIcon
                              style={{
                                fontSize: "150px",
                                color: "white",
                                border: "4px solid white",
                                borderRadius: "50%",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                              }}
                            />
                          )}
                        </div>
                      </Col>
                      <Col xs={24} sm={16} md={18}>
                        <div style={{ paddingLeft: "20px" }}>
                          <h2 className="mb-1" style={{ color: "white" }}>
                            Dr. {firstName} {lastName}
                          </h2>
                          <h4 style={{ color: "rgba(255,255,255,0.9)" }}>
                            {specialization?.department || "N/A"}
                          </h4>
                          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                            <Rate disabled defaultValue={parseFloat(averageRating)} allowHalf style={{ fontSize: "16px" }} />
                            <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "bold" }}>
                              {averageRating}
                            </span>
                            <span style={{ marginLeft: "5px", color: "rgba(255,255,255,0.8)" }}>
                              ({reviews.length} reviews)
                            </span>
                          </div>
                          <Tag
                            color={status === "active" ? "#52c41a" : "#f5222d"}
                            style={{
                              padding: "5px 15px",
                              borderRadius: "15px",
                              marginTop: "10px",
                            }}
                          >
                            <FaCheckCircle /> {status.toUpperCase()}
                          </Tag>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Info Cards Section */}
                  <div style={{ padding: "30px 0" }}>
                    <Row gutter={[24, 24]}>
                      {/* Contact Information */}
                      <Col xs={24} md={12}>
                        <Card title="Contact Information" bordered={false}>
                          <p className="d-flex align-items-center">
                            <HiOutlineMail
                              style={{
                                fontSize: "20px",
                                marginRight: "10px",
                                color: "#1890ff",
                              }}
                            />
                            {email}
                          </p>
                          <p className="d-flex align-items-center">
                            <HiOutlinePhone
                              style={{
                                fontSize: "20px",
                                marginRight: "10px",
                                color: "#52c41a",
                              }}
                            />
                            {mobile}
                          </p>
                        </Card>
                      </Col>

                      {/* Professional Details */}
                      <Col xs={24} md={12}>
                        <Card title="Professional Details" bordered={false}>
                          <p>
                            <strong>Experience:</strong> {experience} years
                          </p>
                          <p>
                            <strong>Qualifications:</strong> {qualifications}
                          </p>
                          <p>
                            <strong>License No.:</strong> {license}
                          </p>
                          <p>
                            <strong>Time Zone:</strong> {timeZone}
                          </p>
                        </Card>
                      </Col>
                    </Row>

                    {/* Schedule Section */}
                    <Card
                      title={
                        <span>
                          <FaClock
                            style={{ marginRight: "10px", color: "#faad14" }}
                          />
                          Weekly Schedule
                        </span>
                      }
                      style={{ marginTop: "24px" }}
                      bordered={false}
                    >
                      <Row gutter={[16, 16]}>
                        {Object.entries(schedule).map(([day, slots]) => (
                          <Col key={day} xs={24} sm={12} md={8}>
                            <Card
                              size="small"
                              title={day.toUpperCase()}
                              style={{
                                background:
                                  slots.length > 0 ? "#f6ffed" : "#fff1f0",
                              }}
                            >
                              {slots.length > 0 ? (
                                slots.map((slot, index) => (
                                  <Tag
                                    key={index}
                                    color="success"
                                    style={{
                                      margin: "2px",
                                      padding: "4px 8px",
                                    }}
                                  >
                                    {slot.start} - {slot.end}
                                  </Tag>
                                ))
                              ) : (
                                <Tag color="error">Not Available</Tag>
                              )}
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card>

                    {/* Reviews Section */}
                    <Card
                      title={
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span>
                            <FaStar style={{ marginRight: "10px", color: "#faad14" }} />
                            Patient Reviews
                          </span>
                          <Button 
                            type="primary" 
                            onClick={() => setShowReviewModal(true)}
                            icon={<MdRateReview />}
                            style={{
                              borderRadius: "8px",
                              background: "#1890ff",
                              border: "none",
                              boxShadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
                            }}
                          >
                            Write a Review
                          </Button>
                        </div>
                      }
                      style={{ marginTop: "24px" }}
                      bordered={false}
                    >
                      {reviews.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                          <FaRegStar style={{ fontSize: "40px", color: "#d9d9d9", marginBottom: "15px" }} />
                          <p>No reviews yet. Be the first to review Dr. {firstName} {lastName}!</p>
                        </div>
                      ) : (
                        <>
                          {/* Reviews summary */}
                          <div style={{ 
                            background: "#f9f9f9", 
                            padding: "15px", 
                            borderRadius: "8px",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center"
                          }}>
                            <div style={{ 
                              fontSize: "48px", 
                              fontWeight: "bold",
                              padding: "0 20px",
                              borderRight: "1px solid #e8e8e8",
                              lineHeight: "1"
                            }}>
                              {averageRating}
                            </div>
                            <div style={{ padding: "0 20px", flex: 1 }}>
                              <Rate disabled defaultValue={parseFloat(averageRating)} allowHalf />
                              <p style={{ margin: "5px 0 0 0", color: "#888" }}>Based on {reviews.length} reviews</p>
                            </div>
                          </div>
                          
                          {/* Individual reviews */}
                          {reviews.map((review) => (
                            <div key={review.id} style={{ marginBottom: "20px" }}>
                              <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <Avatar 
                                  size={48} 
                                  src={review.avatar}
                                  style={{ backgroundColor: !review.avatar ? "#1890ff" : "transparent" }}
                                >
                                  {!review.avatar && review.patientName.charAt(0)}
                                </Avatar>
                                <div style={{ marginLeft: "15px", flex: 1 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h4 style={{ margin: "0" }}>{review.patientName}</h4>
                                    <span style={{ color: "#888" }}>{review.date}</span>
                                  </div>
                                  <div>
                                    <Rate disabled defaultValue={review.rating} style={{ fontSize: "14px" }} />
                                  </div>
                                  <div style={{ 
                                    marginTop: "10px",
                                    position: "relative",
                                    background: "#f5f5f5",
                                    padding: "15px 20px 15px 40px",
                                    borderRadius: "8px" 
                                  }}>
                                    <FaQuoteLeft style={{ 
                                      position: "absolute",
                                      top: "15px",
                                      left: "15px",
                                      color: "#d9d9d9",
                                      opacity: 0.7
                                    }} />
                                    {review.comment}
                                  </div>
                                </div>
                              </div>
                              {review.id !== reviews[reviews.length - 1].id && (
                                <Divider style={{ margin: "20px 0" }} />
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </Card>
                  </div>

                  {/* Book Appointment Button */}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => navigate(`/book-appointment/${doctorId}`)}
                      style={{
                        padding: "12px 40px",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
      {/* Review Modal */}
      <Modal
        title="Write a Review"
        open={showReviewModal}
        onCancel={() => setShowReviewModal(false)}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReview}
          initialValues={{ rating: 5 }}
        >
          <Form.Item
            name="rating"
            label="How would you rate your experience with Dr. Miller?"
            rules={[{ required: true, message: 'Please rate your experience' }]}
          >
            <Rate allowHalf style={{ fontSize: "24px" }} />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Share your experience"
            rules={[{ required: true, message: 'Please share your experience' }]}
          >
            <TextArea 
              rows={5} 
              placeholder="What did you like or dislike about your appointment?"
              maxLength={500}
              showCount
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button onClick={() => setShowReviewModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit Review</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewDoctorProfileByPatient;