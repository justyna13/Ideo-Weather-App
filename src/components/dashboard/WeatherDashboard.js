import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import CityCardsContainer from "../layout/cities/CityCardsContainer";
import WeatherTabs from "../layout/weather-tabs/WeatherTabs";
import PropTypes from 'prop-types';
import Alert from "react-bootstrap/Alert";


class WeatherDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imgUrl: '',
        }

        this.handleCurrentCityChange = this.handleCurrentCityChange.bind(this);
    }

    handleImgChange = (field, e) => {
        if (field === 'imgUrl') {
            this.setState({imgUrl: e});
        }
    }

    addFavouriteCity = (e, cityId, cityLat, cityLon, cityName) => {

        this.props.getNewCity(e, cityId, cityLat, cityLon, cityName, this.state.imgUrl);
        this.setState({imgUrl: ''});

    }

    handleCurrentCityChange = (cityId) => {

        this.props.setCurrentCity(cityId);
    }


    render() {
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />

        else  {
            return (
                <div >
                    <h1 className="mb-4">Weather <span>Forecast</span></h1>

                    <CityCardsContainer
                        handleCurrentCityChange={this.handleCurrentCityChange}
                        favCities={this.props.profile.favCities}
                        handleSubmit={this.addFavouriteCity}
                        handleImgChange={this.handleImgChange} />

                    {this.props.alreadyAdded ?
                        <Alert variant="danger" >City not added - already on your list</Alert>
                        : null
                    }


                    {this.props.weather && this.props.profile.isLoaded && this.props.currentCityId ?
                        <WeatherTabs />
                            : (this.props.isFetching) ?
                                <Alert variant="info" className="status-info">Data fetching, please wait...</Alert>
                                :
                                <Alert variant="info" >Please, select city to check weather</Alert>
                    }


                </div>
            )
        }
    }

}


WeatherDashboard.propTypes = {
    getNewCity: PropTypes.func.isRequired,
    setCurrentCity: PropTypes.func.isRequired,
    alreadyAdded: PropTypes.bool,
    isFetching: PropTypes.bool,
    currentCityId: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        weather: state.weather.weather.weeklyForecast[0],
        currentCityId: state.cities.currentCity.id
    }
}


export default connect(mapStateToProps)(WeatherDashboard);
