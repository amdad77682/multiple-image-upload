import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { Modal } from "./Modal";
import "styled-components/macro";
import CompressedImages from "./CompressedImages";
import ModalContent from "./ModalContent";
import { getImage } from "../request";
// import { uploadImageCore } from "../request";
var timeleft = 1800;
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
  const createInterval = (image) => {
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      document.getElementById(`progressBar_${image}`).value = 1800 - timeleft;
      timeleft -= 1;
    }, 1000);
  };
  const resizeImage = async (data) => {
    const mapping = new Map(images);
    const configmap = new Map();
    data.config.map((item) => {
      const image = {
        original: data.image,

        config: item,
        resized: false,
      };
      const key = item.height + "X" + item.width;
      configmap.set(key, image);
    });
    mapping.set(selectedImage.name, {
      image: data.image,
      name: selectedImage.name,
      config: configmap,
    });

    setImages(mapping);
    getStatus(selectedImage.name);
  };

  const getStatus = async (image) => {
    console.log(image);
    let interval;
    createInterval(image);
    try {
      interval = setInterval(async function () {
        const reqbody = {
          original_image: image,
        };
        const res = await getImage(reqbody);
        console.log("res", res);
        if (res.data.data.resized_data) {
          const data = res.data.data.resized_data;
          for (var key in data) {
            if (images.has(image)) {
              let configs = images.get(image);
              if (configs.has(key)) {
                const specificConfig = configs.get(key);
                const resizedImage = data[key].url;
                const mapping = new Map(images);
                const configmap = new Map();

                specificConfig.original = resizedImage;
                specificConfig.resized = true;
                configmap.set(key, specificConfig);

                mapping.set(image, {
                  image: image,
                  config: configmap,
                });
                setImages(mapping);
              }
            }
          }
        }
      }, 5000);
    } catch (err) {
      clearInterval(interval);
    }
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
            position: "relative",
          }}
        >
          <BiCloudUpload size={32} />
          {"Choose a file"}
          <input
            type="file"
            name={"image"}
            className="input-file"
            style={{
              width: "100%",
              height: "300px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              opacity: "0",
            }}
            accept="image/*"
            onChange={(e) => onFileSelected(e)}
          />
        </div>
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
                blob={selectedImage}
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
