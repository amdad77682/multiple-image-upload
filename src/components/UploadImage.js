import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { Modal } from "./Modal";
import "styled-components/macro";

export default function UploadImage() {
  const [loadingForUploadImage, setLoadingForUploadImage] =
    React.useState(false);
  const [images, setImages] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  async function onFileSelected(event) {
    try {
      setLoadingForUploadImage(true);

      const selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFiles[i]);
        reader.onloadend = function () {
          setImages((curState) => [...curState, reader.result]);
        };
      }

      setOpenModal(true);
      setLoadingForUploadImage(false);
    } catch (error) {
      setLoadingForUploadImage(false);
    }
  }
  return (
    <>
      <div className={"upload-image"}>
        {loadingForUploadImage ? (
          <p>loading...</p>
        ) : images.length > 0 ? (
          images.map((image) => {
            return (
              <img
                key={image}
                alt={image}
                src={image}
                style={{
                  border: "1px dashed",
                  padding: "8px",
                  height: "100px",
                  width: "100px",
                  marginLeft: "10px",
                }}
              />
            );
          })
        ) : null}

        <p
          style={{
            border: "1px dashed",
            padding: "8px",
            height: "100px",
            width: "100px",
            textAlign: "center",
            marginLeft: "10px",
          }}
        >
          <BiCloudUpload size={32} />
          <p>{"Choose a file"}</p>
        </p>

        <input
          type="file"
          multiple
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
                    justifyContent: "center",
                    background: "#f7fafc",
                  }}
                >
                  {loadingForUploadImage ? (
                    <p>loading...</p>
                  ) : (
                    images.map((image) => {
                      return (
                        <img
                          key={image}
                          alt={image}
                          src={image}
                          style={{
                            border: "1px dashed",
                            padding: "8px",
                            height: "100px",
                            marginLeft: "10px",
                          }}
                        />
                      );
                    })
                  )}
                </div>
                <div style={{ padding: "6px", textAlign: "end" }}>
                  <button
                    style={{
                      background: "black",
                      color: "white",
                      padding: "8px",
                      paddingHorizontal: "4px",
                    }}
                    onClick={() => {}}
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
