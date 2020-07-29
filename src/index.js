import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import HomePage from "./screens/HomePage/index";
import FormPage from "./screens/FormPage/index";
import * as serviceWorker from "./serviceWorker";
import FormData from "./screens/FormData";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/"  component={App} />
      <Route   path="/home"  component={HomePage} />
      <Route  path="/form/:uid"  component={FormPage} />
      <Route  path='/formData' component={FormData}/>
    </Switch>
  </HashRouter>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
