import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/GlobalComponents/molecule/Navbar";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import AppContext from "./Context/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContext>
      <Router>
        <AppRouter/>
      </Router>
    </AppContext>
  </React.StrictMode>
);

