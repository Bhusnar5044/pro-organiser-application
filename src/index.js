import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById("root")
);
