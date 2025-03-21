import { useEffect, useState } from "react";
import { Spin, notification } from "antd";
import { postAPI } from "../../API/commonAPI";

const DoctorSignUp = () => {
  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    if (token) {
      location.href = "/patient/dashboard";
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    usernmae: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState("Sign Up");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtn("Please wait...");

    const {
      firstName,
      lastName,
      gender,
      email,
      mobile,
      password,
      confirmPassword,
      username,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !username
    ) {
      openNotification(false, "Fill Details", "Please fill all the fields");
      setLoading(false);
      setBtn("Sign Up");
      return;
    }
    if (password != confirmPassword) {
      openNotification(
        false,
        "Password Mismatch",
        "Password and Confirm Password should be same"
      );
      setLoading(false);
      setBtn("Sign Up");
      return;
    }

    const response = await postAPI("doctor/signup", formData);
    const { status, message, desc } = response;

    if (status) {
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        mobile: "",
        password: "",
        usernmae: "",
        confirmPassword: "",
      });
      openNotification(status, message, desc);
      setTimeout(() => {
        window.location.href = "/doctor/login";
      }, 1000);
    } else {
      openNotification(status, message, desc);
    }
    setLoading(false);
    setBtn("Sign Up");
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          background: "rgb(53 55 57)",
        }}
      >
        <Spin spinning={loading} size="large">
          <form onSubmit={signUpHandler}>
            <div className="auth-box" style={{ width: "800px" }}>
              <h4 className="mb-4">Doctor Sign Up</h4>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  First Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="gender">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  id="gender"
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  autoComplete="off"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="mobile">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  {btn}
                </button>
                <a href="/doctor/login" className="btn btn-secondary">
                  Already registered? Login
                </a>
              </div>
            </div>
          </form>
        </Spin>
      </div>
    </>
  );
};

export default DoctorSignUp;
