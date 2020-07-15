import citiesActionTypes from "../types/citiesTypes";

const initialState = {
    currentCity: {
        id: 0,
        latitude: 0,
        longitude: 0,
        name: ''
    },
    error: null,
};


const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case citiesActionTypes.UPDATE_CITIES_LIST:
            console.log('Updated: ', action.currentCity);

           return state;

        case citiesActionTypes.UPDATE_CITIES_LIST_ERROR:
            return {
                ...state,
                error: action.error.message,
            }
        case citiesActionTypes.SET_SELECTED_CITY:

            if(action.currentCity) {
                return {
                    ...state,
                    currentCity: action.currentCity,
                    error: null
                }
            } else {
                return {
                    ...state,
                    currentCity: {
                        id: 0,
                        latitude: 0,
                        longitude: 0,
                        name: ''
                    },
                    error: null
                }
            }

        default:
            return state;
    }
}

export default cityReducer;
