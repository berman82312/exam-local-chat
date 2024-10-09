import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CustomThemeProvider from "./theme";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element");
}

createRoot(root).render(
  <StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </StrictMode>,
);
