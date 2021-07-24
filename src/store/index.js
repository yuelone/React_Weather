import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import WeatherData from "../reducers/weather";

const store = createStore(WeatherData, applyMiddleware(thunk));

export default store;
