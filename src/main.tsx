import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Navbar";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppRouter/>
    </Router>
  </React.StrictMode>
);
