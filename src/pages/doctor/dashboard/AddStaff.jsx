import { useState } from "react";
import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";
import axios from "axios";
import { message } from 'antd';
const AddStaff = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [staff,setStaff] = useState({
    firstName:"",
    lastName:"",
    email:"",
    mobile:"",
    gender:"",
    password:""
  });

  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  
  const errorShow = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };


  const addStaffFn = async (e) =>{
    e.preventDefault();
    try{
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/doctor/add-staff`,{...staff},{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("doctorToken")}`,
      "Content-Type":"application/json"
    }
  });
  const {message} = res.data;
    success(message);
    setStaff({
      firstName:"",
      lastName:"",
      email:"",
      mobile:"",
      gender:"",
      password:""
    });
    }catch(error){
      if(error?.response?.data){
        const {message} = error?.response?.data;
        errorShow(message);
      }else{
        errorShow(error.message);
      }
    }
  }

  const textChange = (e) => {
    const { name, value } = e.target;
  switch(name){
    case "firstName":
      setStaff({...staff,firstName:value});
      break;
    case "lastName":
      setStaff({...staff,lastName:value});
      break;
      case "email":
        setStaff({...staff,email:value});
        break;
        case "mobile":
          setStaff({...staff,mobile:value});
          break;
          case "gender":
            setStaff({...staff,gender:value});
            break;
            case "password":
              setStaff({...staff,password:value});
              break;
  }
  
  }

  return (
    <>
    {contextHolder}
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
                    <div className="card-header">
                      <h5 className="card-title">Add Appointment Manager</h5>
                    </div>
                    <div className="card-body">
                      {/* Row starts */}
                      <div className="row gx-3">
                        {/* <div className="col-sm-12">
                          <div className="bg-light rounded-2 px-3 py-2 mb-3">
                            <h6 className="m-0">Personal Details</h6>
                          </div>
                        </div> */}
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a1">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="a1"
                              name="firstName"
                              placeholder="Enter First Name"
                              onChange={textChange}
                              value={staff.firstName}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a2">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="a2"
                              name="lastName"

                              placeholder="Enter Last Name"
                              onChange={textChange}
                              value={staff.lastName}

                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a3">
                              Mobile Number
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="a3"
                              name="mobile"

                              placeholder="Enter Mobile Number"
                              onChange={textChange}
                              value={staff.mobile}

                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a6">
                              Gender <span className="text-danger">*</span>
                            </label>
                            <select className="form-select" id="a6" name="gender" onChange={textChange}>
                              <option value={0}>Select Gender</option>
                              <option value={"Male"} selected={staff.gender == "Male"}>Male</option>
                              <option value={"Female"} selected={staff.gender=="Female"}>Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a7">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="a7"
                              value={staff.email}
                              name="email"
                              placeholder="Enter Email"
                              onChange={textChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-lg-4 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="a7">
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="a7"
                              value={staff.password}
                              placeholder="******"
                              onChange={textChange}
                            />
                          </div>
                        </div>
                       
                        <div className="col-sm-12">
                          <div className="d-flex gap-2 justify-content-end">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-outline-secondary"
                            >
                              Cancel
                            </a>
                            <button onClick={addStaffFn} className="btn btn-primary">
                              Add Staff Member
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Row ends */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Row ends */}
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

export default AddStaff;
