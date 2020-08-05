import {
    REGISTER_USER,
} from 'variables/auth';


// Register User
export const registerUser = (payload) =>({ type: REGISTER_USER, payload});