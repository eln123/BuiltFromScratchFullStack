import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history.js";
import Routes from "./react/Routes.js";

import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
