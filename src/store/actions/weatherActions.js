import WeatherActionTypes from "../types/weatherTypes";


export const getWeatherData = (weather) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: WeatherActionTypes.GET_WEATHER_DATA, weather: weather })
    }
}


export const updateWeatherData = (prevCurrentState, newCurrentWeatherData, prevWeeklyState, newWeeklyWeatherData, prevHourlyState, newHourlyWeatherData) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({
            type: WeatherActionTypes.UPDATE_WEATHER_SUCCESS,
            currentWeather: newCurrentWeatherData,
            weeklyForecast: newWeeklyWeatherData,
            hourlyForecast: newHourlyWeatherData
        })
    }
}

export const updateWeatherError = (error) => {
    return (dispatch) => {
        dispatch({
            type: WeatherActionTypes.UPDATE_WEATHER_ERROR,
            error: error
        })
    }
}


