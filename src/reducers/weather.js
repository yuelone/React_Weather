const initState = {
  WeatherData: [
    // {
    //   locationName: "臺北市",
    //   description: "多雲時晴",
    //   windSpeed: 1.1,
    //   temperature: 22.9,
    //   rainPossibility: 48.3,
    //   comfortability: "舒適至悶熱",
    //   weatherCode: 0,
    //   obsTime: "2020-12-12 22:10:00",
    // },
  ],
  loading: false,
  error: null,
};

const WeatherData = (state = initState, action) => {
  switch (action.type) {
    case "GET_WEATHERDATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_WEATHERDATA_SUCCESS":
      return {
        ...state,
        WeatherData: action.payload.WeatherData,
        loading: false,
      };
    case "GET_WEATHERDATA_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default WeatherData;
