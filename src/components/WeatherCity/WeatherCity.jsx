import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import styles from "./index.scss";
import CityData from "../../global/citydata/CityData";

const WeatherCity = () => {
  const [locationName, setLocationName] = useState("臺北市");

  const history = useHistory();

  const BackRouter = (router) => {
    history.goBack(router);
  };
  const ChangeRouter = (router) => {
    history.push(router);
  };

  const selectonChange = (e) => {
    setLocationName(e.target.value);
  };

  const saveBtnOnClick = () => {
    ChangeRouter(`/Weatherpage/${locationName}`);
  };

  return (
    <div className={`${styles.CityPage}`}>
      <title>城市設定</title>
      <div className={`${styles.Title}`}>設定</div>
      <label className={`${styles.Label}`} htmlFor="location">
        地區
      </label>
      <select
        className={`${styles.Select}`}
        name="location"
        id="location"
        value={locationName}
        onChange={selectonChange}
      >
        {CityData.map((theCityData) => (
          <option value={theCityData.cityName} key={v4()}>
            {theCityData.cityName}
          </option>
        ))}
      </select>
      <div className={`${styles.btn_Group}`}>
        <input
          className={`${styles.btn_style} ${styles.btn_back}`}
          type="button"
          value="返回"
          onClick={() => {
            BackRouter();
          }}
        />
        <input
          className={`${styles.btn_style} ${styles.btn_save}`}
          type="button"
          value="儲存"
          onClick={() => {
            saveBtnOnClick();
          }}
        />
      </div>
    </div>
  );
};

export default WeatherCity;
