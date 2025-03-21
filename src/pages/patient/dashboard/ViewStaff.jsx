import { useEffect, useState } from "react";
import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";
import axios from "axios";
import { message } from 'antd';


const ViewStaff = () => {
 const [staff , setStaff] = useState([]);
 const [messageApi, contextHolder] = message.useMessage();


 useEffect(()=>{
   fetchManager();
 },[0]);

 let i= 1;
 const errorShow = (message) => {
  messageApi.open({
    type: 'error',
    content: message,
  });
};
 const fetchManager = async() =>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/get-staff`,{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("doctorToken")}`
      }
    });
   setStaff(res.data.staff);
  }catch(error){
    errorShow(error.message);
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
                  <a href="#">Home</a>
                </li>
                <li
                  className="breadcrumb-item text-primary"
                  aria-current="page"
                >
                  Appoinment Manager List
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
                      <h5 className="card-title"> Appoinment Manager List</h5>
                      <a href="/doctor/add-staff" className="btn btn-primary ms-auto">
                        Add Manager
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
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              staff.map((item,index)=>(
                                <tr id={index}>
                                <td>{i++}</td>
                                <td>
                                  <img
                                    src="/assets/images/patient.png"
                                    className="img-shadow img-2x rounded-5 me-1"
                                    alt="Medical Admin Template"
                                  />
                               {item.firstName+" "+item.lastName}
                                </td>
                                <td>
                                  <span className="badge bg-info-subtle text-info">
                                  {item.gender}
                                  </span>
                                </td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
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

                              ))
                            }
                          
              
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

export default ViewStaff;
