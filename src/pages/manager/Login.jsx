import { useEffect, useState } from "react";
import { Spin } from "antd";

import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../API/commonAPI";
const Login = () => {
  useEffect(() => {
    const token = localStorage.getItem("managerToken");
    if (token) {
      const decode = jwtDecode(token);
      if (decode) {
        location.href = "/appointment-manager/dashboard";
      }
    }
  }, [0]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState("Login");
  const navigate = useNavigate();
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

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBtn("Please wait..");
    if (!username || !password) {
      openNotification(false, "Fill Details", "Please fill all the fields");
      setLoading(false);
      setBtn("Login");
    } else {
      const response = await login("staff/login", {
        email_username: username,
        password,
      });
      const { status, message, desc, token } = response;
      if (status) {
        localStorage.setItem("managerToken", token);
        setTimeout(() => {
          navigate("/appointment-manager/dashboard");
        }, 1500);
      }
      openNotification(status, message, desc);
      setBtn("Login");
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#7e631b",
        }}
      >
        <Spin spinning={loading} size="large">
          <form onSubmit={loginHandler}>
            <div className="auth-box">
              <a href="index-2.html" className="auth-logo mb-4">
                {/* <img
                  src="https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg"
                  alt="Bootstrap Gallery"
                /> */}
              </a>
              <h4 className="mb-4">Appointment Manager Login</h4>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Your email or number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email or number"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="pwd">
                  Your password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    id="pwd"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="ri-eye-line text-primary" />
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-3">
                <a href="/dashboard" className="text-decoration-underline">
                  Forgot password?
                </a>
              </div>
              <div className="mb-3 d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  {btn}
                </button>
                {/* <a href="#" className="btn btn-secondary">
                  Not registered? Signup
                </a> */}
              </div>
            </div>
          </form>
        </Spin>
      </div>
    </>
  );
};

export default Login;
