import React from "react";
import ForecastDashboard from "./WeatherDashboard";
import {setSelectedCity, updateCitiesList} from "../../store/actions/citiesActions";
import {connect} from "react-redux";
import Loader from "../shared/Loader";
import UserProfile from "./UserProfile";
import SignIn from "../auth/SignIn";
import PropTypes from 'prop-types';

import {
    getWeatherData,
    updateWeatherData, updateWeatherError,
} from "../../store/actions/weatherActions";


class WeatherContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            cityChanged: false,
            isFetching: false,
            alreadyAdded: false,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    componentDidMount() {
        setInterval(this.getWeather, 60000);
    }


    setCurrentCity = (id) => {

        let newCurrentCity = this.props.profile.favCities.filter(city => city.id === id);

        let selectedCity = {...this.props.cities.currentCity};

        selectedCity.id = newCurrentCity[0].id;
        selectedCity.latitude = newCurrentCity[0].lat;
        selectedCity.longitude = newCurrentCity[0].lon;
        selectedCity.name = newCurrentCity[0].name;

        this.props.setSelectedCityDispatcher(selectedCity);


        this.setState({cityChanged: true}, function () {
            this.getWeather();
        })

    }


    addCityToFavList = (e, cityId, cityLat, cityLon, cityName, imgUrl) => {

        let cityAlreadyAdded = (this.props.profile.favCities.filter(city => city.id === cityId).length > 0);

        if (cityAlreadyAdded) {
            this.setState({alreadyAdded: true});
        } else {
            this.setState({alreadyAdded: false});
            this.props.updateCitiesList(e, this.props.profile, cityId, cityLat, cityLon, cityName, imgUrl);
            this.setState({cityChanged: true});
         }

    }

    humanizeDates = (dt, sunset) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let date = new Date(dt * 1000);

        if (sunset) {
            let humanReadableDate = (days[date.getDay()] + ', ' + date.getDate() + ' ' +  months[date.getMonth()]);
            let sunsetDate = new Date(sunset * 1000);
            let humanReadableSunsetDate = sunsetDate.getHours() + ':' + sunsetDate.getMinutes();

            return [humanReadableDate, humanReadableSunsetDate];
        } else {
            return days[date.getDay()];
        }

    }


    getCurrentWeather = (data) => {

        let currentWeather = {...this.props.weather.currentWeather};


        currentWeather.temp = Math.floor(data.temp);
        currentWeather.feelsLike = Math.floor(data.feels_like);
        currentWeather.dt = data.dt;
        currentWeather.sunset = data.sunset;
        currentWeather.icon = data.weather[0].icon;


        let humanReadableDates = this.humanizeDates(currentWeather.dt, currentWeather.sunset);

        currentWeather.humanizedDate = humanReadableDates[0];
        currentWeather.humanizedSunset = humanReadableDates[1];

        return currentWeather;
    }


    getHourlyForecast = (data) => {
        let hourlyDates = [];


        data.map(data => {

            let hourlyData = {
                time: '',
                temperature: 0,
                humidity: 0
            };
            let fetchedDate = new Date(data.dt * 1000);


            hourlyData.time = fetchedDate.getHours() + ':00, ' + fetchedDate.getDay() + '.' + fetchedDate.getMonth() + '.' + fetchedDate.getFullYear();
            hourlyData.temperature = data.temp;
            hourlyData.humidity = data.humidity;

            hourlyDates.push(hourlyData);

        })

        return hourlyDates;
    }


    getWeeklyForecast = (data) => {
        let weeklyForecast = [];


        data.map(data => {

            let dailyData = {
                temp: 0,
                humidity: 0,
                icon: '',
                day: '',
                id: 0,
            }

            dailyData.id = data.dt;
            dailyData.day = this.humanizeDates(data.dt);
            dailyData.icon = data.weather[0].icon;
            dailyData.humidity = data.humidity;
            dailyData.temp = Math.floor(data.temp.day);

            weeklyForecast.push(dailyData);
        })

        return weeklyForecast;
    }


    async getWeather() {


        if (this.props.cities.currentCity.id) {
            try {
                let url =  new URL('https://api.openweathermap.org/data/2.5/onecall?');

                let params = {
                    lat: this.props.cities.currentCity.latitude,
                    lon: this.props.cities.currentCity.longitude,
                    units: 'metric',
                    exclude: 'minutely',
                    appid: "2c4399e8320a03138c1616aec7eadb72"
                }

                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                this.setState({isFetching: true});

                console.log(this.props.cities.currentCity.name);

                fetch(url.toString())
                    .then(response => response.json())
                    .then(data => {
                        console.log('fetched data', data);
                        let currentWeather =  this.getCurrentWeather(data.current);
                        let hourlyWeather = this.getHourlyForecast(data.hourly);
                        let weeklyForecast = this.getWeeklyForecast(data.daily);


                        this.props.updateWeatherDispatcher( this.props.weather.currentWeather,
                            currentWeather,
                            this.props.weather.weeklyForecast,
                            weeklyForecast,
                            this.props.weather.hourlyForecast,
                            hourlyWeather);
                    })
                    .catch( error => {
                        this.props.updateWeatherErrorDispatcher(error);
                    })

                this.setState({isFetching: false});

            } catch (error) {
                console.log('error', error)
                this.props.updateWeatherErrorDispatcher(error);
                this.setState({isFetching: false});
            }
        }

        this.setState({cityChanged: false});

    }


    render() {
        return (
            <>
                {this.props.auth.uid ?
                    <div className="wrapper container col-md-10">
                        {this.props.profile.isLoaded ?
                            <div className="dashboard box row">

                                <div className="col-md-8 dashboard-content mx-auto px-4">
                                    <ForecastDashboard
                                        alreadyAdded={this.state.alreadyAdded}
                                        isFetching={this.state.isFetching}
                                        getNewCity={this.addCityToFavList}
                                        setCurrentCity={this.setCurrentCity} />
                                </div>

                                {this.props.cities.currentCity.id ?
                                    <UserProfile />
                                    : null
                                }

                            </div>
                            :
                            <Loader/>
                        }
                    </div>
                    :
                    <SignIn />
                }
            </>

        );
    }

}

WeatherContainer.propTypes = {
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
    console.log(state)
    return {
        cities: state.cities,
        weather: state.weather.weather,
        currentUser: state.auth.currentUser,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCitiesList: (e, profile, cityId, cityLat, cityLon, cityName, imgUrl) =>
                            dispatch(updateCitiesList(e, profile, cityId, cityLat, cityLon, cityName, imgUrl)),
        getWeather: (weather) => dispatch(getWeatherData(weather)),
        updateWeatherDispatcher: (prevCurrentState,
                                  newCurrentWeatherData,
                                  prevWeeklyState,
                                  newWeeklyWeatherData,
                                  prevHourlyState,
                                  newHourlyWeatherData) =>
                                    dispatch(updateWeatherData(
                                        prevCurrentState,
                                        newCurrentWeatherData,
                                        prevWeeklyState,
                                        newWeeklyWeatherData,
                                        prevHourlyState,
                                        newHourlyWeatherData)),
        updateWeatherErrorDispatcher: (error) => dispatch(updateWeatherError(error)),
        setSelectedCityDispatcher: (city) => dispatch(setSelectedCity(city)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
