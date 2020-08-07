import {
    REGISTER_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER
} from 'variables/auth';


// Register User
export const registerUser = (payload) =>({ type: REGISTER_USER, payload});
// Load User
export const loadUser = () =>({ type: LOAD_USER});
// Login User
export const loginUser = (payload) =>({ type: LOGIN_USER, payload});
// Logout User
export const logoutUser = () =>({ type: LOGOUT_USER});