import React from "react";
import "styled-components/macro";

export default function Image({ image, title }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      <h4>{title}</h4>
    </div>
  );
}
