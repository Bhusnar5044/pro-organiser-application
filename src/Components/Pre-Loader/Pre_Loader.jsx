import React from "react";

const Pre_Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        margin: "80px 0",
      }}
    >
      <div
        class="spinner-border  text-primary"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Pre_Loader;
