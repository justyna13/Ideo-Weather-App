import authReducer from "./authReducers";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import cityReducer from "./citiesReducers";
import weatherReducer from "./weatherReducers";


const rootReducer = combineReducers({
    auth: authReducer,
    cities: cityReducer,
    weather: weatherReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer;
