import React from "react";
import Style from "./Modal.module.scss";

const Modal = ({ children }) => {
  return (
    <div className={Style.Backdrop}>
      <div className={Style.Modal_content}>{children}</div>
    </div>
  );
};

export default Modal;
