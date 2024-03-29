import AuthActionTypes from "../types/authTypes";

const initialState = {
    authError: null,
    currentUser: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.INIT_AUTH:
            return {
                ...state,
                authError: null
            }
        case AuthActionTypes.LOGIN_ERROR:
            return {
                ...state,
                authError: action.error.message
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                authError: null
            };
        case AuthActionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case AuthActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null,
                currentUser: action.payload
            };
        case AuthActionTypes.SIGNUP_ERROR:
            console.log('error', action.error.message);
            return {
                ...state,
                authError: action.error.message
            };
        default:
            return state;
    }
};

export default authReducer;
