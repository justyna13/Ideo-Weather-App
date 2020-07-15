import React from "react";
import {connect} from "react-redux";
import {deleteFavCity} from "../../store/actions/citiesActions";
import PropTypes from 'prop-types';


const FollowedPlacesList = ({profile, auth, cities, deleteFavCityDispatch }) => {


    const deleteFavCity = (e, cityId, userId) => {

        let isSelected = (cities.currentCity.id === cityId);
        let currentlySelectedCityId = cities.currentCity.id;

        deleteFavCityDispatch(e, cityId, userId, isSelected, currentlySelectedCityId);
    }

    return (
        <div>
            <p>Currently followed cities:</p>
            {profile.favCities ?
                <ul className="user-dashboard__list">

                    {profile.favCities.map(city => (
                        <span key={city.id} className="user-dashboard__list__item">
                            <li >{city.name}</li>

                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={(e) => deleteFavCity(e, city.id, auth.uid)}>
                              <span aria-hidden="true">&times;</span>
                            </button>

                        </span>
                    ))}
                </ul>:
                null
            }
        </div>
    )
}


FollowedPlacesList.propTypes = {
    deleteFavCityDispatch: PropTypes.func,
}



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        cities: state.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavCityDispatch: (e, cityId, userId, isSelected, currentlySelectedCityId) => dispatch(deleteFavCity(e, cityId, userId, isSelected, currentlySelectedCityId))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowedPlacesList);
