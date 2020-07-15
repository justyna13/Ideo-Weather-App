import AuthActionTypes from './../types/authTypes'

export const initAuth = () => {
    return (dispatch) => {
        dispatch({type: AuthActionTypes.INIT_AUTH})
    }
}


export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( (payload) => {
            dispatch( { type: AuthActionTypes.LOGIN_SUCCESS, payload: payload.user });
        }).catch( (error) => {
            dispatch( {type: AuthActionTypes.LOGIN_ERROR, error });
        });
    }
};


export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then( () => {
            dispatch({ type: AuthActionTypes.SIGNOUT_SUCCESS})
        });
    }
};


export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        let currentUser;

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then( (response) => {
            currentUser = response.user;
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                favCities: []
            });
        }).then( () => {
            dispatch({type: AuthActionTypes.SIGNUP_SUCCESS, payload: currentUser})
        }).catch( (error) => {
            dispatch({type: AuthActionTypes.SIGNUP_ERROR, error: error});
        })
    }
};
