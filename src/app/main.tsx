import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./index";

// biome-ignore lint/style/noNonNullAssertion: DOM element is guaranteed to exist
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
