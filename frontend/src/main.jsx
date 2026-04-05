import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./features/auth/styles/global.css";
import ReduxProvider from "./toolkit/Provider.jsx";
createRoot(document.getElementById("root")).render(
  

  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>,
);
