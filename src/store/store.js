import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import firebaseConfig from "../config/firebaseConfig";

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk.withExtraArgument({getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {
        useFirestoreForProfile: true,
        userProfile: 'users',
        attachAuthIsReady: true})
    )
);


export default store;
