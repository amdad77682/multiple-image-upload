import React from "react";
import "styled-components/macro";
import Image from "./Image";

export default function CompressedImages({ images, onFileSelected }) {
  console.log(images);
  return (
    <>
      {[...images.values()].map((image) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              flex: 1,
              borderBottom: "1px dashed",
              paddingBottom: "10px",
            }}
          >
            <Image image={image.image} title={"Original"} />

            {[...image.config.values()].map((items) => {
              console.log("items", items);
              return (
                <>
                  <Image
                    image={items.original}
                    title={items.config.height + "X" + items.config.width}
                  />
                </>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
