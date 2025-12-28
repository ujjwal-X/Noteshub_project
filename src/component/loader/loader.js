import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <svg width="200px" height="200px" viewBox="0 0 64 48">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        />
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        />
      </svg>
    </div>
  );
};

export default Loader;
