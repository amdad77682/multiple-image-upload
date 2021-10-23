import React from "react";
import "styled-components/macro";
import Image from "./Image";

export default function CompressedImages({ images, onFileSelected }) {
  return (
    <>
      {[...images.values()].map((image) => {
        return (
          <>
            <progress
              value="0"
              max="1800"
              style={{ padding: "10px" }}
              id={`progressBar_${image.name}`}
            ></progress>
            (5min)
            <div
              style={{
                width: "100%",
                display: "flex",
                borderBottom: "1px dashed",
                paddingBottom: "10px",
              }}
            >
              <Image image={image.image} title={"Original"} Public={false} />

              {[...image.config.values()].map((items) => {
                console.log("items", items);
                return (
                  <>
                    <Image
                      image={items.original}
                      resized={items.resized}
                      title={items.config.height + "X" + items.config.width}
                      Public={items.config.Public}
                    />
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
