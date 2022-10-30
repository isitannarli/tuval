/** Dependencies */
import React from "react";
import ReactDOM from "react-dom/client";

/** Components */
import Tuval from "./Tuval";

/** Stylesheets */
import "./assets/stylesheets/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Tuval />
  </React.StrictMode>
);
