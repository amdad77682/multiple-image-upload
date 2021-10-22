import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { Modal } from "./Modal";
import "styled-components/macro";
import CompressedImages from "./CompressedImages";
import ModalContent from "./ModalContent";
// import { uploadImageCore } from "../request";

export default function UploadImage() {
  const [loadingForUploadImage, setLoadingForUploadImage] =
    React.useState(false);
  const [image, setImage] = React.useState(null);
  const [selectedImage, setselectedImage] = React.useState(null);

  const [images, setImages] = React.useState(new Map());
  const [openModal, setOpenModal] = React.useState(false);

  async function onFileSelected(event) {
    try {
      setLoadingForUploadImage(true);

      const selectedFiles = event.target.files[0];
      setselectedImage(selectedFiles);
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
  const resizeImage = async (data) => {
    const mapping = new Map(images);
    const configmap = new Map();
    data.config.map((item) => {
      const image = {
        original: data.image,
        config: item,
      };
      const key = item.height + "X" + item.width;
      configmap.set(key, image);
    });
    mapping.set(selectedImage.name, { image: data.image, config: configmap });

    // const res = uploadImageCore(selectedImage, Public);
    setImages(mapping);
  };
  return (
    <>
      <div className={"upload-image"}>
        {
          loadingForUploadImage ? (
            <p>loading...</p>
          ) : images.size > 0 ? (
            <CompressedImages images={images} onFileSelected={onFileSelected} />
          ) : null //
        }
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
              <ModalContent
                image={image}
                closeModal={() => {
                  setOpenModal(false);
                }}
                resizeImage={resizeImage}
              />
            );
          }}
        />
      ) : null}
    </>
  );
}
