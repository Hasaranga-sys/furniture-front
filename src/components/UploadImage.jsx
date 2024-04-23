import React, { useState, useEffect } from "react";
import "../components/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../components/Assets/Group71.png";
import NameTag from "../components/Assets/Frame4.png";
import Success from "../components/Assets/check.png";
import Cloud from "../components/Assets/cloud.png";
import FileI from "../components/Assets/file.png";
import DeleteIcon from "../components/Assets/delete.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

const UploadImage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFinished, setUploadFinished] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadFinished(false);
    setUploadFailed(false);
  };
  const handleFileChange = (event) => {
    let files;
    if (event.target.files) {
      // File input change
      files = event.target.files;
    } else if (event.dataTransfer && event.dataTransfer.files) {
      // Drag and drop
      files = event.dataTransfer.files;
    }

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setUploadFinished(false);
      setUploadFailed(false);
    }
    // setSelectedFile(event.target.files[0]);
  };

  const removeFileHandle = () => {
    setSelectedFile(null);
    setUploadFailed(null);
  };

  const newFile = () => {
    setSubmit(null);
    setResponseData(null);
    removeFileHandle();
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append("file1", selectedFile);

    axios
      .post("http://192.168.196.46:8081/furniture", formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          console.log(progress);
          // setUploadProgress(progress);
          setTimeout(() => {
            setUploadProgress(progress); // Update progress after 500ms
          }, 500);
          setTimeout(() => {
            setSubmit(true); // Update progress after 500ms
          }, 1100);
        },
      })
      .then((response) => {
        console.log("File uploaded", response);
        setResponseData(response.data);
        console.log("RES DTA", response.data);
        setUploadFinished(true);
        // setSelectedFile(null);
        setUploadProgress(0);
      })
      .catch((error) => {
        setUploadFailed(true);
        console.log("Error uploading file:", error);
      });

    // Implement logic to upload the file to your server
  };
  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2); // Convert bytes to MB with 2 decimal places
  };

  return (
    <div className="">
      {/* header */}
      <div
        className="border"
        style={{
          width: "100%",
          height: "180%",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <img
          className="mt-4 mb-3"
          src={NameTag}
          alt="Background"
          style={{
            top: 0,
            left: 0,
            width: "50%",
            height: "80%",
          }}
        />
        <h3 className="mb-2" style={{ color: "#9ac2ff" }}>
          Your go-to destination for appraising antique furniture!
        </h3>
        <p
          style={{ fontSize: 20, color: "white", marginBottom: 50 }}
          className="w-75 mx-auto mb-3"
        >
          Simply upload a picture of your item, and we'll provide you with an
          estimated value based on market trends and historical data.
        </p>
      </div>
      {/* body */}
      {submit ? (
        <div className="row w-75 mx-auto mt-4 mb-5">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => window.location.reload()}
            >
              Add New
            </button>
          </div>
          {selectedFile && (
            <div className="card border-white w-50">
              {/* <h2>Uploaded Image</h2> */}
              <div>
                <img
                  style={{
                    borderRadius: 30,
                    width: "100%",
                    maxHeight: 450,
                    height: "100%",
                  }}
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                />
              </div>
            </div>
          )}
          {responseData && (
            <>
              <div className="card border-white w-50">
                <h2 className="d-flex justify-content-start ">
                  Product Details
                </h2>
                <hr />

                {responseData.results.type === "Bureau Almirah" && (
                  <div className=" card border-white ">
                    <label className="d-flex justify-content-start ">
                      Type :
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.type}
                    />
                    <label
                      // style={{ width: 270 }}
                      className="d-flex justify-content-start mt-2"
                    >
                      Timber Type:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.timber_type}
                    />
                  </div>
                )}

                {responseData.results.type === "Mese Uda Almirah" && (
                  <div className=" card border-white ">
                    <label className="d-flex justify-content-start ">
                      Type :
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.type}
                    />
                    <label
                      // style={{ width: 270 }}
                      className="d-flex justify-content-start mt-2"
                    >
                      Amount of Ebony carvings:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.amount_of_ebony_carvings}
                    />
                  </div>
                )}

                {responseData.results.type === "Sinhala Pettagam" && (
                  <div className=" card border-white ">
                    <label className="d-flex justify-content-start ">
                      Type :
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.type}
                    />

                    <label className="d-flex justify-content-start mt-2 ">
                      Lock type of Sinhala Pettagam:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.lock_type_of_sinhala_pettagam}
                    />
                  </div>
                )}

                {responseData.results.type === "Galu Almirah" && (
                  <div className=" card border-white ">
                    <label className="d-flex justify-content-start ">
                      Type :
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.type}
                    />

                    <label className="d-flex justify-content-start mt-2">
                      Old:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.old}
                    />

                    <label className="d-flex justify-content-start mt-2">
                      Amount of Ebony and Ivory Carvings:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={
                        responseData.results.amount_of_ebony_and_ivory_carvings
                      }
                    />
                  </div>
                )}

                {responseData.results.type === "Dutch Pettagam" && (
                  <div className=" card border-white ">
                    <label className="d-flex justify-content-start ">
                      Type :
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.type}
                    />
                    <label
                      // style={{ width: 270 }}
                      className="d-flex justify-content-start mt-2"
                    >
                      Size of Dutch Pettagam:
                    </label>
                    <input
                      className="form-control w-50 mt-2"
                      disabled
                      value={responseData.results.size_of_dutch_pettagams}
                    />
                  </div>
                )}

                <h4 className="d-flex justify-content-start mt-3">
                  Price Range
                </h4>
                <hr />
                <h6 className="d-flex justify-content-start">
                  Rs :{responseData.results.price}
                </h6>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <div className="upload-section w-75 mx-auto mt-5 mb-5">
            <div
              className="drag-drop-area"
              onDrop={(e) => {
                e.preventDefault();
                handleFileChange(e);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <label htmlFor="fileInput" className="clickable-label" />
              {selectedFile === null ? (
                <>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the default file input UI
                  />

                  <div
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    onDragOver={(e) => e.preventDefault()} // Prevent default behavior for dragover event
                    onDrop={(e) => e.preventDefault()} // Prevent default behavior for drop event
                  >
                    <img style={{ height: 30 }} src={Cloud} alt="Cloud icon" />
                    <p>Click to upload or drag and drop</p>
                    <p>PNG, JPG</p>
                  </div>
                </>
              ) : (
                <div className="uploaded-file">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the default file input UI
                  />

                  <div
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    <img style={{ height: 30 }} src={Cloud} alt="Cloud icon" />
                    <p>Click to upload or drag and drop</p>
                    <p>PNG, JPG</p>
                  </div>

                  {/* <p>{selectedFile.name}</p>
                  <button onClick={removeFileHandle}>Remove</button> */}
                </div>
              )}
              <input
                type="file"
                onChange={onFileChange}
                accept=".jpg,.jpeg,.png"
                hidden
              />
            </div>

            {/* Progress bar */}
          </div>
          {selectedFile && !uploadFailed && (
            <div className="" id="file one">
              <div className="card w-75 mx-auto p-3">
                {selectedFile && (
                  <div className=" d-flex justify-content-between">
                    {selectedFile && (
                      <div className="mb-3 ">
                        <div className="d-flex flex-row">
                          <img
                            className=""
                            src={FileI}
                            alt="Background"
                            style={{
                              top: 0,
                              left: 0,
                              width: "8%",
                              height: "8%",
                            }}
                          />
                          <div className="mx-2  ">
                            <p className="">{selectedFile.name}</p>
                            <p
                              style={{ marginTop: -15 }}
                              className="  d-flex justify-content-start"
                            >
                              {bytesToMB(selectedFile.size)} MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {uploadFinished ? (
                      <img
                        className="mt-4 mb-2"
                        src={Success}
                        alt="Background"
                        style={{
                          width: "1.5%",
                          height: "1.5%",
                        }}
                      />
                    ) : (
                      <img
                        onClick={removeFileHandle}
                        className="mt-4 mb-3"
                        src={DeleteIcon}
                        alt="clickable-icon"
                        style={{
                          cursor: "pointer",
                          width: "1.5%",
                          height: "1.5%",
                        }}
                      />
                    )}
                  </div>
                )}
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              </div>
              <div className="upload-section  w-75 mx-auto mt-2 d-flex justify-content-end">
                {selectedFile && (
                  <div>
                    <button
                      type="button"
                      style={{ marginRight: 11 }}
                      className=" btn btn-light"
                      onClick={onFileUpload}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className=" btn btn-primary"
                      onClick={onFileUpload}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {uploadFailed && (
            // when upload error
            <div id="file two">
              <div
                style={{ backgroundColor: "rgba(193, 57, 43, 0.05)" }}
                className="card shadow-lg border-danger text-danger p-3 w-75 mx-auto"
              >
                {selectedFile && (
                  <div className=" d-flex justify-content-between">
                    {selectedFile && (
                      <div className="mb-3 ">
                        <div className="d-flex flex-row">
                          <img
                            className=""
                            src={FileI}
                            alt="Background"
                            style={{
                              top: 0,
                              left: 0,
                              width: "8%",
                              height: "8%",
                            }}
                          />
                          <div style={{ marginBottom: -25 }} className="mx-2">
                            <p className="d-flex justify-content-start">
                              {bytesToMB(selectedFile.size)} MB
                            </p>
                            <p
                              style={{ marginTop: -17 }}
                              className="d-flex justify-content-start"
                            >
                              {selectedFile.name}
                            </p>
                            <p
                              className="d-flex justify-content-start"
                              style={{ marginTop: -17 }}
                            >
                              Try Again !
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {uploadFinished ? (
                      <img
                        className="mt-4 mb-3"
                        src={Success}
                        alt="Background"
                        style={{
                          top: 0,
                          left: 0,
                          width: "1.5%",
                          height: "1.5%",
                        }}
                      />
                    ) : (
                      <img
                        onClick={removeFileHandle}
                        className="mt-4 mb-3"
                        src={DeleteIcon}
                        alt="Background"
                        style={{
                          top: 0,
                          left: 0,
                          width: "1.5%",
                          height: "1.5%",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    // <div className="upload-container">
    //   <div className="upload-header">
    //     <h2>Image Upload</h2>
    //   </div>
    //   <div className="upload-section">
    //     <div className="drag-drop-area">
    //       {selectedFile === null ? (
    //         <>
    //           <p>Click to upload or drag and drop</p>
    //           <p>PNG, JPG</p>
    //         </>
    //       ) : (
    //         <div className="uploaded-file">
    //           <p>{selectedFile.name}</p>
    //           <button onClick={() => setSelectedFile(null)}>Remove</button>
    //         </div>
    //       )}
    //       <input
    //         type="file"
    //         onChange={onFileChange}
    //         accept=".jpg,.jpeg,.png"
    //         hidden
    //       />
    //     </div>
    //     <div className="file-info">
    //       <p>4.2 MB</p>
    //     </div>
    //   </div>
    //   <div>
    //     <button
    //       type="button"
    //       className="btn btn-primary"
    //       onClick={onFileUpload}
    //       disabled={selectedFile === null}
    //     >
    //       Upload
    //     </button>
    //   </div>
    // </div>
  );
};

export default UploadImage;
