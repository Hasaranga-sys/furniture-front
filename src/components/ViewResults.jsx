import React from "react";

const ViewResults = ({ location }) => {
  const { uploadData } = location.state || {}; // Access data from props

  const { selectedImage, responseDetails } = uploadData || {};
  return (
    <div className="container">
      {/* Display response data */}
      <div>
        <h2>Response Data</h2>
        {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
      </div>

      {/* Display uploaded image */}
      <div>
        <h2>Uploaded Image</h2>
        {/* <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" /> */}
      </div>
    </div>
  );
};

export default ViewResults;
