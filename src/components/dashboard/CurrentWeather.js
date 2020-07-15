import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";


const CurrentWeather = ({weather, cities }) => {

    let currentWeather = weather.currentWeather;

    return (
        <div className="current-weather">

            <div className="current-weather__header">
                <img src={"http://openweathermap.org/img/w/" + currentWeather.icon + ".png"} alt="icon"/>

                <p>
                    <span className="current-weather__header-title">Today</span>
                    <br/>
                    <span className="current-weather__header-subtitle">{currentWeather.humanizedDate}</span>
                </p>
            </div>


            <p><span className="current-weather-temp">{currentWeather.temp? Math.round(currentWeather.temp): 0}</span> <sup>&deg; C</sup></p>

            <p className="current-weather__header-subtitle">{cities.currentCity.name}</p>

            <p className="current-weather__header-subtitle">Feels like {currentWeather.feelsLike} &middot; Sunset {currentWeather.humanizedSunset}</p>


            <span className="btn btn-light btn-charts"><Link to='/charts'>Check charts</Link></span>
        </div>
    )
}


CurrentWeather.propTypes = {
    selectedCityName: PropTypes.string,
    icon: PropTypes.string,
    feelsLike: PropTypes.number,
    sunset: PropTypes.string,
    dt: PropTypes.string,
    temp: PropTypes.number,
    hourlyForecast: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {

    return {
        weather: state.weather.weather,
        cities: state.cities,
    }
}

export default connect(mapStateToProps)(CurrentWeather);


