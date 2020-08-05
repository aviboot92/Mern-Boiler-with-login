import {
    REGISTER_USER,
    LOAD_USER
} from 'variables/auth';


// Register User
export const registerUser = (payload) =>({ type: REGISTER_USER, payload});
// Load User
export const loadUser = () =>({ type: LOAD_USER});