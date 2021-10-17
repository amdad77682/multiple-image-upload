import React from "react";

export default function UploadImage() {
  const [loadingForUploadImage, setLoadingForUploadImage] =
    React.useState(false);
  const [images, setImages] = React.useState([]);
  async function onFileSelected(event) {
    try {
      setLoadingForUploadImage(true);
      //   let fileUrls = [];
      const selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFiles[i]);
        reader.onloadend = function () {
          setImages((curState) => [...curState, reader.result]);
        };
        // fileUrls.push(selectedFiles[i]);
      }
      //   setImages([...fileUrls]);
      //   const res = await uploadImageCore(selectedFile);
      setLoadingForUploadImage(false);
    } catch (error) {
      setLoadingForUploadImage(false);
    }
  }
  return (
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
              style={{ maxHeight: 300 }}
            />
          );
        })
      ) : (
        <>
          <p
            style={{
              border: "1px dashed",
              padding: "8px",
            }}
          >
            {"Choose a file"}
          </p>
        </>
      )}
      <input
        type="file"
        multiple
        name={"image"}
        className="input-file"
        accept="image/*"
        onChange={(e) => onFileSelected(e)}
      />
    </div>
  );
}
