import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MacbookPro } from "./components/screens/MacBookPro/MacBookPro.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <MacbookPro />
  </StrictMode>,
);
