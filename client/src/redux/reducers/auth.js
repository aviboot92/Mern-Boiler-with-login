import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from 'variables/auth';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            {
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                }
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            {
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    user: null
                }
            }

        default:
            return state;
    }
}