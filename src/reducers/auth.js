import { 
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    REMOVE_AUTH_LOADING, 
    SET_AUTH_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_FAIL,
} 

from "../actions/types";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false
};

const authReducer = (state=initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS: 
            return {
                ...state,
                register_success: false,
                isAuthenticated: false
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case ACTIVATION_SUCCESS:

        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default authReducer;