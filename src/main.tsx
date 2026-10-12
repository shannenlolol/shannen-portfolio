import { createRoot } from "react-dom/client";
import { initializeTimeOfDay } from "./cottage/timeOfDay";
import App from "./App";

initializeTimeOfDay();
createRoot(document.getElementById("root")!).render(<App />);
