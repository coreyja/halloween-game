import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const reactRoot = ReactDOM.createRoot(
      document.getElementById("react-root")!,
    );

    const queryClient = new QueryClient();
    reactRoot.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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
