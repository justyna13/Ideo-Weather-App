import React from "react";
import DayForecast from "./DayForecast";
import {connect} from "react-redux";


const WeekForecast = ({weather}) => {

    return (
        <div>
            {weather.weeklyForecast.map(dailyWeather => {
                return (

                    <DayForecast
                        day={dailyWeather.day}
                        key={dailyWeather.id}
                        temp={dailyWeather.temp}
                        iconUrl={"http://openweathermap.org/img/w/" + dailyWeather.icon + ".png"}
                        humidity={dailyWeather.humidity}
                    />

                )
            })}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        weather: state.weather.weather,
    }
}

export default connect(mapStateToProps)(WeekForecast);
