import React from "react";
import { Switch, Route } from "react-router-dom";
import WeatherReader from "./WeatherReader.jsx";
import CityData from "../../global/citydata/CityData";

const Weather = () => (
  <Switch>
    <Route exact sensitive path="/Weatherpage" />
    <Route
      path="/Weatherpage/:cityName"
      component={() => (
        <>
          <WeatherReader CityData={CityData} />
        </>
      )}
    ></Route>
  </Switch>
);

export default Weather;
