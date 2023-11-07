import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
