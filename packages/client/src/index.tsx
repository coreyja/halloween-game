import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const reactRoot = ReactDOM.createRoot(
      document.getElementById("react-root")!,
    );
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  },
  false,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
