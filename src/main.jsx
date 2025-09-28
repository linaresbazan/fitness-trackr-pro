import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";
import { ActivityProvider } from "./activities/ActivityContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <ActivityProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ActivityProvider>
    </ApiProvider>
  </AuthProvider>,
);
