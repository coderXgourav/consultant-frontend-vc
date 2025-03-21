const Soon = () => {
  return (
    <>
      <div className="container">
        {/* Maintenance container starts */}
        <div className="maintenance-container" style={{ height: "100vh" }}>
          <h1 className="mb-5 lh-1 display-1">We’ll be back soon!</h1>
          <h4 className="fw-light mb-5 w-75">
            Sorry for the inconvenience. We’re performing some maintenance at
            the moment. We will be back online shortly!
          </h4>
          <a href="/dashboard" className="btn btn-success px-4 py-2 fs-5">
            <i className="ri-arrow-left-s-line lh-1 me-2" /> Back to Home
          </a>
        </div>
        {/* Maintenance container ends */}
      </div>
    </>
  );
};

export default Soon;
