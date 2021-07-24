import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import dayjs from "dayjs";
import styles from "./index.scss";
import pageChange from "../../asserts/images/cog.svg";
import airFlow from "../../asserts/images/airFlow.svg";
import rain from "../../asserts/images/rain.svg";
import refresh from "../../asserts/images/refresh.svg";
import isloading from "../../asserts/images/loading.svg";
import {
  getWeatherDataRequest,
  getWeatherDataSuccess,
  getWeatherDataFailure,
} from "../../actions/weather";
import WeatherChange from "../../components/WeatherChange";
import {
  API_HOST_WEATHER,
  API_HOST_FORECAST_WEATHER,
} from "../../global/api/API";

const WeatherReader = (props) => {
  const [currentpage, setCurrentPage] = useState(true);

  const WeatherData = useSelector((state) => state.WeatherData);
  const dispatchWeatherData = useDispatch();
  const loading = WeatherData.loading;
  const error = WeatherData.error;

  const history = useHistory();
  const ChangeRouter = (router) => {
    history.push(router);
    setCurrentPage(false);
  };

  // 透過 useParams 拿到 citydata 資料
  const { cityName: LOCATION_NAME } = useParams();
  const storageCity = localStorage.getItem("cityName") || "臺北市";
  // 拿到的資料型態: {cityName: "臺中市", locationName: "臺中", sunriseCityName: "臺中市"}
  const findlocation = props.CityData.find(
    (theNews) => String(theNews.cityName) === String(LOCATION_NAME)
  );
  // 拿出觀測 api 需要的 locationName : locationName: "臺中"
  const OBERVATION_LOCATION = findlocation.locationName;

  const API_HOST_WEATHER_OBERVATION = `${API_HOST_WEATHER}&locationName=${OBERVATION_LOCATION}`;
  const API_HOST_FORECAST_WEATHER_LOCATION = `${API_HOST_FORECAST_WEATHER}&locationName=${LOCATION_NAME}`;
  // redux action fetchapi
  const action_fetchWeatherData = () => async (dispatch) => {
    try {
      dispatch(getWeatherDataRequest());

      const results = await Promise.all([
        fetch(API_HOST_WEATHER_OBERVATION, { method: "GET" }),
        fetch(API_HOST_FORECAST_WEATHER_LOCATION, { method: "GET" }),
      ]);

      const finalData = await Promise.all(
        results.map((result) => result.json())
      );

      const weatherData = finalData[0].records.location[0];
      // 預測資料的陣列整理
      const forecastweatherData = finalData[1].records.location[0];
      const forecastWx =
        forecastweatherData.weatherElement[0].time[0].parameter;
      const forecastPoP =
        forecastweatherData.weatherElement[1].time[0].parameter;
      const forecastCI =
        forecastweatherData.weatherElement[3].time[0].parameter;
      //預測資料: 縣市名 描述 天氣代號 降雨量 舒適程度
      const locationName = forecastweatherData.locationName;
      const description = forecastWx.parameterName;
      const weatherCode = forecastWx.parameterValue;
      const rainPossibility = forecastPoP.parameterName;
      const comfortability = forecastCI.parameterName;
      // 觀測資料: 溫度 降雨量 觀測時間
      const windSpeed = weatherData.weatherElement[2].elementValue;
      const temperature = weatherData.weatherElement[3].elementValue;
      const obsTime = weatherData.obsTime;
      // 把全部的天氣資料整理成一個陣列
      const Allweather = [
        {
          locationName,
          description,
          windSpeed,
          temperature,
          weatherCode,
          rainPossibility,
          comfortability,
          obsTime,
        },
      ];
      // 把全部的天氣資料傳出來
      dispatch(getWeatherDataSuccess(Allweather));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(getWeatherDataFailure(errorMessage));
    }
  };

  useEffect(() => {
    dispatchWeatherData(action_fetchWeatherData());
  }, []);

  return (
    <div>
      {loading && <img src={isloading} alt={"圖片"} />}
      {error && !loading && <h2>{error}</h2>}
      <title>{LOCATION_NAME}天氣預報</title>
      {currentpage &&
        WeatherData.map((theWeatherData) => (
          <div className={`${styles.WeatherCard}`} key={v4()}>
            <img
              className={`${styles.PageChange}`}
              src={pageChange}
              alt={"圖片"}
              onClick={() => {
                ChangeRouter("/Citypage");
              }}
            />{" "}
            <div className={`${styles.Location}`}>
              {theWeatherData.locationName}
            </div>
            <div className={`${styles.Description}`}>
              {theWeatherData.description}&ensp;{theWeatherData.comfortability}
            </div>
            <div className={`${styles.CurrentWeather} ${styles.Temperature}`}>
              <div>{Math.round(theWeatherData.temperature)}</div>
              <div className={`${styles.Celsius}`}>°C &ensp;</div>
              <div>{WeatherChange(theWeatherData.weatherCode)}</div>
            </div>
            <div className={`${styles.AirFlow}`}>
              {" "}
              <img
                className={`${styles.img_svg}`}
                src={airFlow}
                alt={"圖片"}
              />{" "}
              {theWeatherData.windSpeed} m/h
            </div>
            <div className={`${styles.Rain}`}>
              <img className={`${styles.img_svg}`} src={rain} alt={"圖片"} />{" "}
              {theWeatherData.rainPossibility}%
            </div>
            <div className={`${styles.Refresh}`}>
              最後觀測時間 :{" "}
              {new Intl.DateTimeFormat("zh-TW", {
                hour: "numeric",
                minute: "numeric",
              }).format(dayjs(theWeatherData.obsTime))}{" "}
              &ensp;{" "}
              <img
                className={`${styles.img_Refrsh}`}
                src={refresh}
                alt={"圖片"}
                onClick={() => {
                  dispatchWeatherData(action_fetchWeatherData());
                }}
              />{" "}
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeatherReader;
