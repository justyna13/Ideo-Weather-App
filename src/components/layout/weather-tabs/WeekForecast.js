import React from "react";
import DayForecast from "./DayForecast";
import {connect} from "react-redux";


const WeekForecast = ({weather}) => {

    return (
        <div>
            {weather.map(dailyWeather => {
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
        weather: state.weather.weather.weeklyForecast,
    }
}

export default connect(mapStateToProps)(WeekForecast);
