import WeatherActionTypes from "../types/weatherTypes";


const initialState = {
    weather: {
        currentWeather: {
            temp: 0,
            icon: '',
            sunset: 0,
            feelsLike: 0,
            dt: 0,
            humanizedDate: '',
            humanizedSunset: ''
        },
        weeklyForecast: [],
        hourlyForecast: []
    },
    error: null
}


const weatherReducer = (state=initialState, action) => {
    switch (action.type) {
        case WeatherActionTypes.GET_WEATHER_DATA:
            return {
                ...state,
                currentWeather: action.currentWeather
            };
        case WeatherActionTypes.UPDATE_WEATHER_SUCCESS:
            return {
                ...state,
                weather: {
                    currentWeather: action.currentWeather,
                    weeklyForecast: action.weeklyForecast,
                    hourlyForecast: action.hourlyForecast
                },
                error: null
            }
        case WeatherActionTypes.UPDATE_WEATHER_ERROR:
            return {
                ...state,
                error: action.error.message
            }
        default:
            return state;
    }
}

export default weatherReducer;
