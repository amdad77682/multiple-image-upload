import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { Modal } from "./Modal";
import "styled-components/macro";

export default function UploadImage() {
  const [loadingForUploadImage, setLoadingForUploadImage] =
    React.useState(false);
  const [image, setImage] = React.useState(null);
  const [height, setHeight] = React.useState("");

  const [width, setWidth] = React.useState("");
  const [Public, setPublic] = React.useState(false);

  const [images, setImages] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);

  async function onFileSelected(event) {
    try {
      setLoadingForUploadImage(true);

      const selectedFiles = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(selectedFiles);
      reader.onloadend = function () {
        setImage(reader.result);
      };

      setOpenModal(true);
      setLoadingForUploadImage(false);
    } catch (error) {
      setLoadingForUploadImage(false);
    }
  }
  const resizeImage = async () => {
    setImages([...images, image]);
  };
  return (
    <>
      <div className={"upload-image"}>
        {loadingForUploadImage ? (
          <p>loading...</p>
        ) : images.length > 0 ? (
          images.map((image) => {
            return (
              <div
                key={image}
                className="container"
                css={`
                  position: relative;
                  margin-top: 50px;
                  width: 300px;
                  height: 300px;
                `}
                style={{ border: "1px dashed", marginLeft: "10px" }}
              >
                <img
                  css={`
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    left: 0;
                  `}
                  src={image}
                  alt={image}
                />
                <p
                  className="title"
                  css={`
                    position: absolute;
                    width: 300px;
                    left: 0;
                    top: 120px;
                    font-weight: 700;
                    font-size: 30px;
                    text-align: center;
                    text-transform: uppercase;
                    color: white;
                    z-index: 1;
                    transition: top 0.5s ease;
                  `}
                >
                  Public
                </p>
                <div
                  className="overlay"
                  css={`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0);
                    transition: background 0.5s ease;
                  `}
                ></div>
                <div
                  className="button"
                  css={`
                    position: absolute;
                    width: 300px;
                    left: 0;
                    top: 180px;
                    text-align: center;
                    opacity: 0;
                    transition: opacity 0.35s ease;
                  `}
                >
                  <a
                    href="/"
                    css={`
                      width: 200px;
                      padding: 12px 48px;
                      text-align: center;
                      color: white;
                      border: solid 2px white;
                      z-index: 1;
                    `}
                  >
                    {" "}
                    Download{" "}
                  </a>
                </div>
              </div>
            );
          })
        ) : null}

        <div
          style={{
            border: "1px dashed",
            padding: "8px",
            width: "300px",
            height: "300px",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <BiCloudUpload size={32} />
          {"Choose a file"}
        </div>

        <input
          type="file"
          name={"image"}
          className="input-file"
          accept="image/*"
          onChange={(e) => onFileSelected(e)}
        />
      </div>
      {openModal ? (
        <Modal
          closeModal={() => {
            setOpenModal(false);
          }}
          header={"Resize"}
          modalContentWidth="60%"
          isActive={openModal}
          renderBody={() => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                css={`
                  padding: 4px;
                `}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    background: "#f7fafc",
                  }}
                >
                  {loadingForUploadImage ? (
                    <p>loading...</p>
                  ) : (
                    <img
                      key={image}
                      alt={image}
                      src={image}
                      style={{
                        border: "1px dashed",
                        padding: "8px",
                        height: "200px",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label>
                    {" "}
                    Height
                    <input
                      onChange={(e) => setHeight(e.target.value)}
                      value={height}
                      type="number"
                      className="form-input "
                      style={{ padding: "4px" }}
                    />
                  </label>
                  <label>
                    {" "}
                    Width
                    <input
                      onChange={(e) => setWidth(e.target.value)}
                      value={width}
                      type="number"
                      className="form-input "
                      style={{ padding: "4px" }}
                    />
                  </label>
                  <lavel>
                    {" "}
                    <input
                      type="checkbox"
                      onClick={() => setPublic(!Public)}
                      checked={Public}
                    />
                    <span class="slider round">Public</span>
                  </lavel>
                </div>
                <div style={{ padding: "6px", textAlign: "end" }}>
                  <button
                    css={`
                      width: 200px;
                      padding: 12px 48px;
                      text-align: center;
                      color: white;
                      background: black;
                      border: solid 2px white;
                      z-index: 1;
                    `}
                    onClick={() => {
                      resizeImage();
                      setOpenModal(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            );
          }}
        />
      ) : null}
    </>
  );
}
