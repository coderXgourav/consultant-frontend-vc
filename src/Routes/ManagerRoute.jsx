import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/manager/Login";
import Dashboard from "../pages/manager/Dashboard/Dashboard";
const ManagerRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/appointment-manager/login" element={<Login />} />
        <Route path="/appointment-manager/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default ManagerRoute;
