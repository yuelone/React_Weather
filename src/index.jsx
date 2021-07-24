import "regenerator-runtime";
import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import WeatherCity from "./views/Citypage";
import Weather from "./views/Weather";
import NotFoundpage from "./views/NotFoundpage";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/Weatherpage" component={Weather} />
        <Route path="/Citypage" component={WeatherCity} />
        <Route path="/" component={NotFoundpage} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
