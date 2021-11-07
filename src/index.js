import { StrictMode } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import App from "./App";

const rootElement = document.getElementById("root");
const body = $("body");
ReactDOM.render(
  <StrictMode>
    <App context={body} />
  </StrictMode>,
  rootElement
);
