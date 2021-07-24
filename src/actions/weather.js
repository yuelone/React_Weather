export const getWeatherDataRequest = () => ({
  type: "GET_WEATHERDATA_REQUEST",
});

export const getWeatherDataSuccess = (WeatherData) => ({
  type: "GET_WEATHERDATA_SUCCESS",
  payload: { WeatherData },
});

export const getWeatherDataFailure = (error) => ({
  type: "GET_WEATHERDATA_FAILURE",
  payload: { error },
});
