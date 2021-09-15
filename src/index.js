import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { setupSentry } from "./sentry";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ basename: "/" });

setupSentry(history);

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById("root")
);

// to log results (for example: reportWebVitals(console.log))
// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
