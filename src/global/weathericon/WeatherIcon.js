import dayCloudy from "../../asserts/images/day-cloudy.svg";
import daythunderstom from "../../asserts/images/day-thunderstorm.svg";
import dayclear from "../../asserts/images/day-clear.svg";
import daycloudyfog from "../../asserts/images/day-cloudy-fog.svg";
import dayfog from "../../asserts/images/day-fog.svg";
import daypartiallyclearwithrain from "../../asserts/images/day-partially-clear-with-rain.svg";
import daysnowing from "../../asserts/images/day-snowing.svg";
import nightthunderstorm from "../../asserts/images/night-thunderstorm.svg";
import nightclear from "../../asserts/images/night-clear.svg";
import nightcloudyfog from "../../asserts/images/night-cloudy-fog.svg";
import nightfog from "../../asserts/images/night-fog.svg";
import nightcloudy from "../../asserts/images/night-cloudy.svg";
import nightpartiallyclearwithrain from "../../asserts/images/night-partially-clear-with-rain.svg";
import nightsnowing from "../../asserts/images/night-snowing.svg";

const WeatherIcons = {
  day: {
    isThunderstorm: daythunderstom,
    isClear: dayclear,
    isCloudyfog: daycloudyfog,
    isCloudy: dayCloudy,
    isFog: dayfog,
    isPartiallyClearWrithRain: daypartiallyclearwithrain,
    isSnowing: daysnowing,
  },
  night: {
    isThunderstorm: nightthunderstorm,
    isClear: nightclear,
    isCloudyfog: nightcloudyfog,
    isCloudyfog: nightfog,
    isCloudy: nightcloudy,
    isfog: nightfog,
    isPartiallyClearWrithRain: nightpartiallyclearwithrain,
    isSnowing: nightsnowing,
  },
};

export default WeatherIcons;
