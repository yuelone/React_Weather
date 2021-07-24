import React from "react";
import styles from "./index.scss";
import WeatherTypes from "../../global/WeatherType/WeatherType";
import WeatherIcons from "../../global/weathericon/WeatherIcon";
import getDayAndNight from "../../global/dayandnight/DayAndNight";

const theWeatherType = (weatherCode) => {
  const [theWeatherType] =
    Object.entries(WeatherTypes).find(([weatherType, weatherTypeCodes]) =>
      weatherTypeCodes.includes(Number(weatherCode))
    ) || [];
  return theWeatherType;
};

const WeatherChange = (weatherCode) => {
  const LOCATION_NAME_FORECAST = "臺北市";
  const DayAndNight = getDayAndNight(LOCATION_NAME_FORECAST);
  const findweatherType = theWeatherType(weatherCode);
  const theweatherIcon = WeatherIcons[DayAndNight][findweatherType];
  return (
    <img
      className={`${styles.img_weatherchange_svg}`}
      src={theweatherIcon}
      alt={"圖片"}
    />
  );
};

export default WeatherChange;
