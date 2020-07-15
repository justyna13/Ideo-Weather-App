import CitiesActionTypes from "../types/citiesTypes";

export const updateCitiesList = (e, prevState, cityId, cityLat, cityLon, cityName, imgUrl) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        const userId = getState().firebase.auth.uid;

        let newCity = {
            id: cityId,
            lat: cityLat,
            lon: cityLon,
            imgUrl: imgUrl,
            name: cityName
        }

        prevState.favCities ?  prevState.favCities.push(newCity): prevState.favCities = [newCity];

        let userData = {
            firstName: prevState.firstName,
            lastName: prevState.lastName,
            favCities: prevState.favCities
        }

        console.log(userData.favCities);

        firestore.collection('users').doc(userId).update(userData).then( () => {
            dispatch({ type: CitiesActionTypes.UPDATE_CITIES_LIST, currentCity: newCity })
        }).catch( (error) => {
            dispatch({type: CitiesActionTypes.UPDATE_CITIES_LIST_ERROR, error: error });
        });
    }
}


export const deleteFavCity = (e, cityId, userId, isSelected, currentlySelectedCityId) => {

    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        let prevState = getState().firebase.profile;
        let selectedCity;
        let currentlySelectedCity = prevState.favCities.filter(city => city.id === currentlySelectedCityId);


        console.log('currently selected', currentlySelectedCity[0]);

        if (isSelected) {
            selectedCity = null;
        } else {
            selectedCity = currentlySelectedCity[0];
        }


        let filteredFavCities = prevState.favCities.filter(city => city.id !== cityId);


        let userData = {
            firstName: prevState.firstName,
            lastName: prevState.lastName,
            favCities: filteredFavCities,
        }


        console.log('w action', selectedCity);


        firestore.collection('users').doc(userId).update(userData).then(() => {
            dispatch({type: CitiesActionTypes.UPDATE_CITIES_LIST, currentCity: selectedCity});
            dispatch({type: CitiesActionTypes.SET_SELECTED_CITY, currentCity: selectedCity});
        }).catch((error) => {
            dispatch({type: CitiesActionTypes.UPDATE_CITIES_LIST_ERROR, error: error });
        });
    }
}


export const setSelectedCity = (city) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: CitiesActionTypes.SET_SELECTED_CITY, currentCity: city })
    }
}
