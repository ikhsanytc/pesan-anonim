"use client";
import React from "react";
import "./style.css";

const EmptyPesan = () => {
  return (
    <>
      <div className="site">
        <div className="sketch">
          <div className="bee-sketch red"></div>
          <div className="bee-sketch blue"></div>
        </div>

        <h1>
          404:
          <small>Players Not Found</small>
        </h1>
      </div>
    </>
  );
};

export default EmptyPesan;
