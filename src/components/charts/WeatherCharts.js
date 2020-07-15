import React from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {Bar, Line} from 'react-chartjs-2';
import Loader from "../shared/Loader";


const WeatherCharts = ({auth, profile, weather, cities}) => {

    const tempDataset = weather.hourlyForecast.map(data => data.temperature);
    const daysDataset = weather.hourlyForecast.map(data => data.time.split(','));
    const humidityDataset = weather.hourlyForecast.map(data => data.humidity);


    const dataForTemp = {
        labels: daysDataset,
        datasets: [
            {
                label: "Temperature [°C]",
                data: tempDataset,
                fill: true,
                backgroundColor: "#fff5cc",
                borderColor: "#ffcc00"
            },
        ]
    };

    const optionsForTemp = {
        title: {
            display: true,
            text: "Temperature"
        }
    };

    const dataForHumidity = {
        labels: daysDataset,
        datasets: [
            {
                label: "Humidity [%]",
                data: humidityDataset,
                fill: true,
                backgroundColor: "#e7f1fd",
                borderColor: "#1878f0",
            },
        ]
    };

    const optionsForHumidity = {
        title: {
            display: true,
            text: "Humidity"
        },
    };


    return (
        <>
            {auth.uid ?
                <div className="wrapper container col-md-10">
                    {profile.isLoaded && weather.hourlyForecast ?

                        <div className="dashboard box row p-5">
                            <p>Check how temperature and humidity will change in {cities.currentCity.name}</p>

                            <Line data={dataForTemp} options={optionsForTemp} />

                            <Bar data={dataForHumidity} options={optionsForHumidity} />

                        </div>
                        : <Loader />
                    }
                </div>
                : <Redirect to='/signin' />
            }
        </>
    )
}

WeatherCharts.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        favCities: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            imgUrl: PropTypes.string,
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }))
    })
}


const mapStateToProps = (state) => {
    return {
        weather: state.weather.weather,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        cities: state.cities,
    }
}

export default connect(mapStateToProps)(WeatherCharts);
