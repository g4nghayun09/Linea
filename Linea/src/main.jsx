import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Adjustment from "./adjustment.jsx";
import Invite from "./invite.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Adjustment />
    <Invite />
  </StrictMode>,
);
