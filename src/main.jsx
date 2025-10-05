import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-center" reverseOrder={false} />
  </StrictMode>
);
